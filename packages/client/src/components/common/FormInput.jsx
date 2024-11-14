/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import styles from "./formInput.module.css";

export const FormInput = forwardRef(function FormInput(props, ref) {
  const { id, type, isValid, label, children, ...rest } = props;
  const inputElement =
    type === "select" ? (
      <select
        id={id}
        ref={ref}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        {...rest}
      >
        {children}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        ref={ref}
        className={`${styles["form-input"]} ${!isValid ? styles.error : ""}`}
        {...rest}
      />
    );

  return (
    <>
      <label htmlFor={id}>{label}:</label>
      {inputElement}
    </>
  );
});
