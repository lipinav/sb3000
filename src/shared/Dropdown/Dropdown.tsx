import React from 'react';
import styles from './dropdown.css';
import { useIsMounted } from '../../../notes/5.2.hooks';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;  // to control dropdown
  onOpen?: () => void;  // callback to control dropdown
  onClose?: () => void;  // callback to control dropdown
}

const NOOP = () => {};

export function Dropdown({ button, children, isOpen, onOpen = NOOP, onClose = NOOP }: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(isOpen);
  const [isMounted] = useIsMounted();
  React.useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  React.useEffect(() => (isMounted && isDropdownOpen) ? onOpen() : onClose(), [isDropdownOpen]);

  const handleOpen = () => {  // list opens automatic
    setIsDropdownOpen(!isDropdownOpen);
    // if (isOpen === undefined) {
    //   setIsDropdownOpen(!isDropdownOpen);
    // }
  }

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>
        { button }
      </div>     
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div className={styles.list} onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
