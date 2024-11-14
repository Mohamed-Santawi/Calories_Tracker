import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useNavigateAfterCountDown(redirectCounter, navigateLink) {
  const [counter, setCounter] = useState(redirectCounter);
  const intervalHandler = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      navigate(navigateLink);
    }
  }, [counter, navigate]);
  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
      return clearInterval(intervalHandler.current);
    }, 1000);
  }, []);
  return counter;
}
