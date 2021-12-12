import React, { useContext } from 'react';
import styles from './searchblock.css';
import { UserBlock } from './UserBlock';
import { userContext } from '../../context/userContext';
import {useSelector} from 'react-redux';
import {TRootState} from '../../../store/reducer';
import {TMeState} from '../../../store/me/reducer';

export function SearchBlock(): JSX.Element {
  // const { iconImg, name } = useContext(userContext);
  const { loading, data, error} = useSelector<TRootState, TMeState>(state => state.me)

  return (
    <div className={styles.searchBlock}>
      <UserBlock avatarSrc={data.iconImg} username={data.name}  />
    </div>
  );
}
