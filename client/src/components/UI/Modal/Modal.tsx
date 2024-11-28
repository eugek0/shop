import React, { ReactNode, SetStateAction } from 'react'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import styles from './modal.module.scss'

interface ModalProps {
  isOpened: boolean,
  setIsOpened: React.Dispatch<SetStateAction<boolean>>
  title: string,
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpened, setIsOpened, title, children }) =>
  isOpened ? (
    <div className={styles.Background}>
      <div className={styles.Modal}>
        <div className={styles.Head}>
          <span className={styles.Title}>{title}</span>
          <CloseOutlinedIcon className={styles.CloseIcon} onClick={() => setIsOpened(false)} />
        </div>
        <div className={styles.Content}>
          {children}
        </div>
      </div>
    </div>
  ) : null

export default Modal