/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react/prop-types */
import styles from "./Record.module.css";
import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext";
import { Button, StylledRecordCell } from "../common";
export function Record(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);
  useEffect(() => {
    addCalories((totalPrev) => totalPrev + Number(props.calories));

    return () => addCalories((totalPrev) => totalPrev - Number(props.calories));
  }, []);
  const deleteHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/records/${props.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      props.refresh?.();
    }
  };
  return (
    <ul className={styles.record}>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StylledRecordCell>{props.calories}</StylledRecordCell>
      </li>
      <Button variant="secondry" onClick={deleteHandler}>
        Delete
      </Button>
    </ul>
  );
}
