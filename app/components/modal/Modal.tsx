import React, { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  contents: string[];
  useProcess?: boolean;
  processFunc?: (() => void) | null;
  processLabel?: string;
}
const Modal = ({isOpen, useProcess, contents, processFunc = null, processLabel = '확인'}: ModalProps) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(isOpen);

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, [])

  const handleProcessModal = useCallback(async () => {
    if (!processFunc) return;
    
    await processFunc();
    setModalOpen(false);
  }, [processFunc])

  const createModalDom = () => {
    return (
      <div className={classNames(styles.dim, modalOpen ? 'modal-open' : '')}>
        <main className={styles.modal}>
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
  
          <div className="styles.actions">
            <button 
              type="button" 
              onClick={handleCloseModal} 
              className="styles.cancel"
            >
              닫기
            </button>
            {
              useProcess && processFunc
              ?
              <button 
                type="button" 
                onClick={handleProcessModal} 
                className="styles.process"
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
  }

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (typeof window === "undefined") return <></>;

  return mounted ? createPortal(createModalDom(), document.getElementById("root-modal") as HTMLElement) : <></>;
}

export default Modal;