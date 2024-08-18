import Link from 'next/link';
import type { ApiData } from '../api/api.types';
import styles from "./board.module.scss";
import Image from 'next/image';
interface BoardProps {
  info: ApiData;
}

const Board = ({info}: BoardProps) => {
  return (
    <div className={styles.board}>
      {/* 깃헙 링크 */}
      <Link href='/' className={styles.link}>
        {/* 유저 이미지 */}
        <Image
          src="/sample.png"
          alt="User Image"
          width={32}
          height={32}
          priority
        />

        {/* 유저 정보 */}
        <div className={styles.userInfo}>
          <strong>{info.id}</strong>
          {
            info.name
            ?
            <span>{info.name}</span>
            :
            <></>
          }
        </div>
      </Link>

      {/* 깃헙 커밋 정보 */}
      <div className={styles.grassInfo}>
        <span>오늘의 텃밭은,</span>

        {/* 상세 페이지 */}
        <Link href='/' className={styles.link}>
          <Image
            src={info.commitCount > 0 ? 'grass--active.svg' : 'grass.svg'}
            alt="User Image"
            width={24}
            height={34}
            priority
          />
        </Link>
      </div>

      {/* 듀오링고 출석 정보 */}
      <div className={styles.duoInfo}>
        <span>듀오 했나요?</span>

        {/* 알파벳 이미지 */}
        <Image
          src={info.attendedDuo ? 'alphabet--active.svg' : 'alphabet.svg'}
          alt="User Image"
          width={24}
          height={32}
          priority
        />
      </div>
    </div>
  );
}

export default Board;
