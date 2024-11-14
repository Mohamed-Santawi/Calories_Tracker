/* eslint-disable react/prop-types */
// import stylled from "styled-components";
import styles from "./RecordList.module.css";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { Link } from "react-router-dom";
import { Record } from "./Record";
import { TextContent } from "../common";
export function RecordList(props) {
  const { totalCalories } = useContext(AppContext);
  const resultElement = props.records?.length ? (
    <ul className={styles.list}>
      {props.records.map((record) => (
        <li className={styles.listItem} key={record.id}>
          <Link to={`${record.id}`}>
            <Record {...record} refresh={props.refresh} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <TextContent value="No records found for this date" />
  );
  return (
    <>
      {resultElement}
      <label className={styles.totalCalories}>
        Total Calories : {totalCalories}
      </label>
    </>
  );
}
