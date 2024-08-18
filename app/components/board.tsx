import styles from "./board.module.scss";

interface BoardProps {
  className: string;
}

const Board = ({className}: BoardProps) => {
  return (
    <div className={styles.board}>
      뭐냐
    </div>
  );
}

export default Board;
