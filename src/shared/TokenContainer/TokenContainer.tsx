import React, {useEffect} from 'react';
import styles from './tokencontainer.css';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, setToken} from '../../store';
interface ITokenContainer {
  children?: React.ReactNode;
}
export function TokenContainer({children}: ITokenContainer): JSX.Element {
  const value = useSelector<RootState, string>(state => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (window.__token__) {
        dispatch(setToken(window.__token__));
      // setToken(window.__token__)
    }
  }, [])
  return (
    <>
      {children}
    </>
  );
}
