import React, {useEffect} from 'react';
import styles from './tokencontainer.css';
import {useDispatch, useSelector} from 'react-redux';
import {TRootState} from '../../store/reducer';
interface ITokenContainer {
  children?: React.ReactNode;
}
export function TokenContainer({children}: ITokenContainer): JSX.Element {
  const value = useSelector<TRootState, string>(state => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    // if (window.__token__) {
    //     dispatch(tokenRequestSuccess(window.__token__));
    //   // setToken(window.__token__)
    // }
  }, [])
  return (
    <>
      {children}
    </>
  );
}
