import Link from 'next/link';
import styles from "./board.module.scss";
import Image from 'next/image';

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
  return (
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

        {/* TODO: 상세 페이지 */}
        <Link href='/' className={styles.link}>
          <Image
            src={info.pushCount > 0 ? 'grass--active.svg' : 'grass.svg'}
            alt="User Image"
            width={24}
            height={34}
            priority
          />
          <strong>{info.pushCount}</strong>
        </Link>
      </div>

      {/* TODO: 듀오링고 출석 정보 */}
      <div className={styles.duoInfo}>
        <span>듀오 했나요?</span>

        {/* info.attendedDuo */}
        <Image
          src={true ? 'alphabet--active.svg' : 'alphabet.svg'}
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
