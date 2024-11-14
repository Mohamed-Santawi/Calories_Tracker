/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// import styled from "styled-components";
import styles from "./Form.module.css";
import {
  useEffect,
  useReducer,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { AppContext } from "@root/AppContext";
import { Button, FormInput } from "@root/components/common";
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

export function Form(props) {
  const { setCurrentDate, currentDateStr, totalCalories, isDateValid } =
    useContext(AppContext);
  const [formState, dispatchFn] = useReducer(formatReducer, DEFAULT_VALUE);
  const contentRef = useRef();
  const mealRef = useRef();
  const caloriesRef = useRef();
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
  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onFormatSubmit({
      date: currentDateStr,
      content: contentRef.current.value,
      meal: mealRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };
  const onCancelHandler = useCallback(() => {
    if (isFormValid) {
      props.onCancel();
    }
  }, [isFormValid]);
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <p className={styles.warning}>You spent {totalCalories} calories</p>
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
