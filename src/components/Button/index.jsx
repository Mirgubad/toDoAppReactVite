import React from "react";
import styles from "./button.module.css";
import { getClasses } from "../../utils/getClasses";

const buttonTypes = {
  primary: "primary",
  secondar: "secondary",
};
const Button = ({ type, variant = "primary", children, ...rest }) => {
  return (
    <button
      type={type === "submit" ? "submit" : "button"}
      className={getClasses([
        styles.button,
        styles[`button--${buttonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
};

const SelectButton = ({ children, id, ...rest }) => {
  return (
    <select
      id={id}
      className={getClasses([styles.button, styles.button__select])}
      {...rest}
    >
      {children}
    </select>
  );
};

export { SelectButton };
export default Button;
