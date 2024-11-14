import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./DetailsPage.module.css";
import { TextContent } from "@root/components/common";
import { useLoadData } from "@root/utils/hooks";
export function DetailsPage() {
  const params = useParams();
  const [details, _, error] = useLoadData(
    `http://localhost:3000/records/${params.recordId}`,
    "single"
  );
  let content;
  content = <TextContent value={error} />;
  if (!error) {
    content = details && (
      <div className={styles.container}>
        <div className={styles.item}>
          <p>Date:</p>
          <p>{details.date.toLocaleString()}</p>
        </div>
        <div className={styles.item}>
          <p>Meal:</p>
          <p>{details.meal}</p>
        </div>
        <div className={styles.item}>
          <p>Content:</p>
          <p>{details.content}</p>
        </div>
        <div className={styles.item}>
          <p>Calories:</p>
          <p>{details.calories}</p>
        </div>
      </div>
    );
  }
  return (
    <>
      {content}
      <Link className={styles["back-link"]} to={".."}>
        Back
      </Link>
    </>
  );
}
