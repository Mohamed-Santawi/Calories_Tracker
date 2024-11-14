/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import { getDateFromString } from "./utils/utils";

export const AppContext = createContext({
  currentDate: new Date(),
  setCurrentDate: (val) => {},
  totalCalories: 0,
  setTotalCalories: (val) => {},
  currentDateStr: "",
  isDateValid: false,
});
function AppContextProvider(props) {
  const updateCurrentDate = (val) => {
    setCurrentDate(getDateFromString(val));
  };
  const [currentDate, setCurrentDate] = useState(new Date());
  const [totalCalories, setTotalCalories] = useState(0);
  const { children } = props;
  const currentDateStr = currentDate
    ? currentDate.toISOString().split("T")[0]
    : "";

  return (
    <AppContext.Provider
      value={{
        currentDate,
        setCurrentDate: updateCurrentDate,
        totalCalories,
        setTotalCalories,
        currentDateStr,
        isDateValid: !!currentDateStr,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export default AppContextProvider;
