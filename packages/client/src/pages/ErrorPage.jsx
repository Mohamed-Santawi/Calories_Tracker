import { useNavigateAfterCountDown } from "@root/utils/hooks";
import { Link } from "react-router-dom";

export function ErrorPage() {
  const REDIRECT_COUNTER = 10;
  const HOME_PAGE = "/";
  const counter = useNavigateAfterCountDown(REDIRECT_COUNTER, HOME_PAGE);
  return (
    <>
      <h1>Something Went Wrong...</h1>
      <p>Redirecting to Home Page in {counter}</p>
      <p>
        Click <Link to={HOME_PAGE}>Home Page</Link> to return back
      </p>
    </>
  );
}
