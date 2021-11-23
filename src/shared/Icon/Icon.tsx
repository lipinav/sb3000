import React from 'react';
import styles from './icon.css';
import CommentsIcon from '../Icons/commentsIcon.svg';
import ComplainIcon from '../Icons/complainIcon.svg';
import HideIcon from '../Icons/hideIcon.svg';
import SaveAdaptiveIcon from '../Icons/saveAdaptiveIcon.svg';
import ShareAdaptiveIcon from '../Icons/shareAdaptiveIcon.svg';

// interface IIconComponents {
//     [N: string]?: React.ReactNode;
// }

interface TProps  {
    width?: string,
    height?: string,
    viewBox?: string,
    className?: string
}

const iconComponents: Record<string, React.ComponentType<TProps>> = {
    comments: CommentsIcon,
    complain: ComplainIcon,
    hide: HideIcon,
    save: SaveAdaptiveIcon,
    share: ShareAdaptiveIcon
}

interface IIconProps {
  name: string;
  size?: 16 | 18 | 20 | 22 | 32;
  viewBox?: string,
  className?: string;
}

// const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) =>
//     obj[key];

// <SpecComponent width={size.toString()}/>
// export function Icon({ name, size = 16 }: IIconProps) {
export function Icon(props: IIconProps): JSX.Element {
  const {
    name,
    size = 16,
    viewBox = '0 0 16 16',
    className  
  } = props
  const SpecComponent = iconComponents[name || 'comments'];
  return (
    <div className={styles.icon}>
      <SpecComponent width={size.toString()} height={size.toString()} viewBox={viewBox} className={className}/>
    </div>
  );
}
