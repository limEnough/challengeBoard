import Link from "next/link";
import styles from "./header.module.scss";
import React from "react";
import Image from "next/image";
import { getMonth, Month } from "date-fns";
import { enUS } from "date-fns/locale";

const Header: React.FC = () => {
  const today = new Date();
  const month = getMonth(today) as Month;

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo}>
        <Image
          src="/logo.svg"
          alt="Challenge Board Logo"
          width={50}
          height={32}
          priority // 리소스의 사전 로드 트리거
        />
        <span className={styles.month}>{month + 1}</span>
      </Link>
      
    </header>
  )
}

export default Header;