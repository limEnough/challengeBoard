import Link from 'next/link';
import styles from "./board.module.scss";
import Image from 'next/image';
import { useCallback, useState } from 'react';
import Modal from '../modal/Modal';

interface Board {
  name: string;
  avatarUrl: string;
  url: string,
  commitMessages: string[],
  pushCount: number,
}
interface BoardProps {
  info: Board;
}

const Board = ({info}: BoardProps) => {
  const [openDetails, setOpenDetails] = useState(false);

  const closeModal = useCallback((value: boolean) => {
    setOpenDetails(value);
  }, [])

  return (
    <>
      {/* Board */}
      <div className={styles.board}>
        {/* 깃헙 링크 */}
        <Link href={info.url} className={styles.link}>
          {/* 유저 이미지 */}
          <Image
            src={info.avatarUrl}
            alt="User Avatar Image"
            width={32}
            height={32}
            priority
          />

          {/* 유저 정보 */}
          <div className={styles.userInfo}>
            <strong>{info.name}</strong>
          </div>
        </Link>

        {/* 깃헙 커밋 정보 */}
        <div className={styles.grassInfo}>
          <span>오늘의 수확</span>

          {/* 커밋 리스트 모달 */}
          <button type='button' onClick={() => setOpenDetails(true)}>
            <Image
              src={info.pushCount > 0 ? '/images/grass--active.svg' : '/images/grass.svg'}
              alt="User Image"
              width={24}
              height={34}
              priority
            />
            <strong>{info.pushCount}</strong>
          </button>
        </div>

        {/* TODO: 듀오링고 출석 정보 */}
        <div className={styles.duoInfo}>
          <span>듀오 했나요?</span>

          {/* info.attendedDuo */}
          <Image
            src={true ? '/images/alphabet--active.svg' : '/images/alphabet.svg'}
            alt="User Image"
            width={20}
            height={30}
            priority
          />
        </div>
      </div>

      {/* Detail Modal */}
      {
        openDetails
        ?
        <Modal contents={info.commitMessages} closeModal={closeModal}/>
        :
        <></>
      }
    </>
  );
}

export default Board;
