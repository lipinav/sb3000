import React from 'react';
import styles from './userblock.css';
import { Icon } from './../../../Icon';
import { EColors, Text } from './../../../Text';
import { Break } from './../../../Break';

interface IUserBlockProps {
  avatarSrc?: string,
  username?: string
}

export function UserBlock({ avatarSrc, username }: IUserBlockProps) {
  return (
    <a 
      href={'https://www.reddit.com/api/v1/authorize?client_id='+process.env.CLIENT_ID+'&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity'}
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt={'User avatar'} className={styles.avatarImage}/>
          : <Icon name={'avatarAnon'} size={50} viewBox={'0 0 50 50'}/>
        }
      </div>

      <div className={styles.username}>
        <Break size={12} />
        <Text
          size={20}
          color={username ? EColors.black : EColors.grey99}
          >
        {username || 'Аноним'}
        </Text>
      </div>
    </a>
  );
}
