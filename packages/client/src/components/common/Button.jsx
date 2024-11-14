/* eslint-disable react/prop-types */
import styles from "./Button.module.css";
import { memo } from "react";
export const Button = memo(function Button(props) {
  const { variant, children, ...rest } = props;
  return (
    <button className={styles[variant]} {...rest}>
      {children}
    </button>
  );
});
