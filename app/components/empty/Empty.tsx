import React from "react";
import styles from "./empty.module.scss";

const Empty: React.FC = () => {
  return (
    <div className={styles.empty}>
      <p>아직 아무도 퀘스트를 완료하지 않았어요!</p>
    </div>
  )
}

export default Empty;