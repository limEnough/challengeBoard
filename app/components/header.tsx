import Link from "next/link";
import styles from "./header.module.scss";
import React from "react";
import Image from "next/image";

const Header: React.FC = () => {
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
      </Link>
      
    </header>
  )
}

export default Header;