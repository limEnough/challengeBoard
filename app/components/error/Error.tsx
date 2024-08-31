import React from "react";
import Image from "next/image";
import styles from "./error.module.scss";

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.error}>
      <Image
        src="/error.svg"
        alt="Error Icon"
        width={50}
        height={50}
        priority
      />

      <p>
        이용에 불편을 드려 죄송합니다. <br />
        잠시 후 다시 시도해주세요!
      </p>
    </div>
  )
}

export default ErrorPage;