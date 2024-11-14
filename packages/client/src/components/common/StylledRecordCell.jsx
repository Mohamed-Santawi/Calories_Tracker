/* eslint-disable react/prop-types */
import styles from "./StylledRecordCell.module.css";
export function StylledRecordCell(props) {
  return <div className={styles["stylled-record-cell"]}>{props.children}</div>;
}
