import styles from "./PageLayout.module.css";
import { Outlet } from "react-router-dom";
import { SideNav } from "../components/common";
import AppContextProvider from "../AppContext";

export function PageLayout() {
  return (
    <AppContextProvider>
      <div className={styles.layout}>
        <SideNav />
        <div className={styles["content-wrapper"]}>
          <Outlet />
        </div>
      </div>
    </AppContextProvider>
  );
}
