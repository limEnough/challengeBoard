import React from "react";
import styles from "./loading.module.scss";

const Loading: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  )
}

export default Loading;