import styles from "./TrackPage.module.css";
import { useLoadData } from "@root/utils/hooks";
import { Link } from "react-router-dom";
import { RecordList } from "@components/records";
import { TextContent } from "@root/components/common";
import { useContext } from "react";
import { AppContext } from "@root/AppContext";

export function TrackPage() {
  const { setCurrentDate, currentDateStr } = useContext(AppContext);
  const [records, loading, error, refreshData] = useLoadData(
    `http://localhost:3000/records?date=${currentDateStr}`
  );

  const onChangeHandler = (event) => {
    setCurrentDate(event.target.value);
    refreshData();
  };

  let content;
  if (loading) {
    content = <TextContent value="Loading..." />;
  } else if (error) {
    content = <TextContent value={error} />;
  } else if (records.length > 0) {
    content = <RecordList records={records} refresh={refreshData} />;
  } else {
    content = (
      <TextContent value="No records available for the selected date." />
    );
  }

  return (
    <div>
      <h1 className={styles.title}>Calorie Tracker</h1>
      <div className={styles["list-wrapper"]}>
        <div>
          <label htmlFor="listing-date" className={styles["label-listing"]}>
            Select Date
          </label>
          <input
            onChange={onChangeHandler}
            type="date"
            name=""
            id="listing-date"
            className={styles["input-listing"]}
            value={currentDateStr}
          />
        </div>
        <Link className={styles.button} to={"create"}>
          Track Food
        </Link>
      </div>
      {content}
    </div>
  );
}
