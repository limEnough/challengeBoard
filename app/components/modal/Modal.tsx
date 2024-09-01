import React, { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

interface ModalProps {
  contents: string[];
  useProcess?: boolean;
  processFunc?: (() => void) | null;
  processLabel?: string;
  closeModal: (value: boolean) => void;
}
const Modal = ({useProcess, contents, processFunc = null, processLabel = '확인', closeModal}: ModalProps) => {
  const [mounted, setMounted] = useState<boolean>(false);

  const handleCloseModal = useCallback(() => {
    closeModal(false);
  }, [closeModal])

  const handleProcessModal = useCallback(async () => {
    if (!processFunc) return;
    
    await processFunc();
    closeModal(false);
  }, [processFunc, closeModal])

  const createModalDom = useCallback(() => {
    return (
      <div className={styles.dim}>
        <main className={styles.modal}>
          <h3>커밋 내역</h3>

          <ul>
            {
              contents?.length 
              ?
              contents.map((list, index) => {
                return <li key={`modal-content-${index}`}>{list}</li>
              })
              :
              <></>
            }
          </ul>
  
          <div className={styles.actions}>
            <button 
              type="button" 
              onClick={handleCloseModal} 
              className={styles.cancel}
            >
              닫기
            </button>
            {
              useProcess && processFunc
              ?
              <button 
                type="button" 
                onClick={handleProcessModal} 
                className={styles.process}
              >
                {processLabel}
              </button>
              :
              <></>
            }
          </div>
        </main>
      </div>
    )
  }, [contents, handleCloseModal, handleProcessModal, processFunc, processLabel, useProcess])

  const deleteModalDom = useCallback(() => {
    const rootModal = document.getElementById('root-modal');
      
    if (rootModal) rootModal.innerHTML = ''; 
  }, [])

  useEffect(() => {
    setMounted(true);

    // 컴포넌트가 언마운트 될 때 클린업 호출
    return () => {
      setMounted(false);
      deleteModalDom();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 서버사이드 렌더링 방지
  if (typeof window === "undefined") return <></>;

  // mounted가 true일 때만 모달을 렌더링
  return mounted ? createPortal(createModalDom(), document.getElementById("root-modal") as HTMLElement) : <></>;

  // return createModalDom();
}

export default Modal;