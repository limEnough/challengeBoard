"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { NextApiRequest, NextApiResponse } from "next";
import { sendFCMNotification } from "@/app/api/notification";
import styles from "./header.module.scss";

const Header: React.FC = () => {
  /** TODO: Toggle 푸시 알림 설정 */
  const clickPushHandler = () => {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        // 푸시 거부됐을 때 처리할 내용
        console.log('푸시 거부됨');
      } else {
        // 푸시 승인됐을 때 처리할 내용
        console.log('푸시 승인됨');
      }
    });
  };

  return (
    <header className={styles.header}>
      <Link href='/' className={styles.logo}>
        <Image
          src="/images/logo.svg"
          alt="Challenge Board Logo"
          width={50}
          height={32}
          priority // 리소스의 사전 로드 트리거
        />
      </Link>
      
      <button
        type="button"
        onClick={clickPushHandler}
        className={styles.alarm}
      >
        푸시 알림 설정 토글 
      </button>
    </header>
  )
}

export default Header;