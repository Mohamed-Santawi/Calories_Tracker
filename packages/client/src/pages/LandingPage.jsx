import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <p>Welcome To Calorie Tracker App</p>
      <p>
        To Get Started! <Link to="/track">Start Tracking</Link>
      </p>
    </>
  );
}
