import React from "react";
import styles from "./title.module.css";

const PageTitle = ({ children, ...rest }) => {
  return (
    <h2 className={styles.title} {...rest}>
      {children}
    </h2>
  );
};

export default PageTitle;
