import styles from "./EditPage.module.css";
import {
  useEffect,
  useReducer,
  useContext,
  useRef,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AppContext } from "@root/AppContext";
import { Button, FormInput } from "@root/components/common";
import { useNavigate } from "react-router-dom";
const DEFAULT_VALUE = {
  meal: true,
  content: false,
  calories: true,
};
function formatReducer(state, action) {
  const { key, value, auxValue } = action;
  let valid;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxValue < 0) ||
        (value != "sport" && auxValue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };
    case "calories":
      valid =
        (auxValue === "sport" && value < 0) ||
        (auxValue != "sport" && value >= 0);
      return {
        ...state,
        calories: valid,
      };
    default:
      return {
        ...state,
        meal: !!value,
      };
  }
}

export function EditPage() {
  const { setCurrentDate, currentDateStr, totalCalories, isDateValid } =
    useContext(AppContext);
  const [formState, dispatchFn] = useReducer(formatReducer, DEFAULT_VALUE);
  const contentRef = useRef();
  const mealRef = useRef();
  const caloriesRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { content: isContentValid, calories: isCaloriesValid } = formState;

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };
  const onMealBlurHandler = (event) => {
    dispatchFn({ key: "meal", value: event.target.value });
  };
  const onContentBlurHandler = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };
  const onCaloriesBlurHandler = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      auxValue: contentRef.current.value,
    });
  };
  const isFormValid = useMemo(() => {
    return isDateValid && isContentValid && isCaloriesValid;
  }, [isDateValid, isContentValid, isCaloriesValid]);
  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    }
  }, [isContentValid]);
  async function save(record) {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/records", {
        method: "POST",
        body: JSON.stringify({
          r_date: record.date,
          r_meal: record.meal,
          r_food: record.content,
          r_cal: record.calories,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed To Create A New Record!!");
      }
      navigate("..");
    } catch (error) {
      setError(error.message);
    }
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    save({
      date: currentDateStr,
      content: contentRef.current.value,
      meal: mealRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };
  const onCancelHandler = useCallback(() => {
    navigate("..");
  }, []);
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {error && <p className={styles.warning}>Request Failed, {error}</p>}
      <FormInput
        type="date"
        id="date"
        label="Date"
        onChange={onDateChangeHandler}
        value={currentDateStr}
        isValid={isDateValid}
      />
      <FormInput
        label="Meal"
        id="meal"
        onBlur={onMealBlurHandler}
        ref={mealRef}
        type="select"
        isValid
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snacks">Snacks</option>
      </FormInput>
      <FormInput
        type="text"
        label="Content"
        id="content"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      />
      <FormInput
        type="number"
        label="Calories"
        id="calories"
        onBlur={onCaloriesBlurHandler}
        isValid={isCaloriesValid}
        ref={caloriesRef}
      />
      <div className={styles.footer}>
        <Button variant="primary" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button variant="secondry" type="button" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
