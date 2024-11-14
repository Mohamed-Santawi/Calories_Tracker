/* eslint-disable react/prop-types */
import { StylledRecordCell } from "../common";
import styles from "./RecordDate.module.css";
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export function RecordDate(props) {
  // const month = props.date.toLocaleString("default", { month: "long" });
  // const day = props.date.getDate();
  // const year = props.date.getFullYear();
  const month = MONTHS[props.date.getUTCMonth()];
  const day = props.date.getUTCDate();
  const year = props.date.getUTCFullYear();
  return (
    <StylledRecordCell>
      <div className={styles["record-date-day"]}>{day}</div>
      <div className={styles["record-date-month"]}>{month}</div>
      <div className={styles["record-date-year"]}>{year}</div>
    </StylledRecordCell>
  );
}
