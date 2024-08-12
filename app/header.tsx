import Link from "next/link";
import styles from "./page.module.scss";
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
        />
      </Link>
      
    </header>
  )
}

export default Header;