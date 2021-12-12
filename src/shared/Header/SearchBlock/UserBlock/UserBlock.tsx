import React from 'react';
import styles from './userblock.css';
import { Icon } from './../../../Icon';
import { EColors, Text } from './../../../Text';
import { Break } from './../../../Break';

interface IUserBlockProps {
  avatarSrc?: string,
  username?: string,
  loading?: boolean,
  error?: string
}

export function UserBlock({ avatarSrc, username, loading, error }: IUserBlockProps) {
  return (
    <a 
      href={'https://www.reddit.com/api/v1/authorize?client_id='+process.env.CLIENT_ID+'&response_type=code&state=random_string&redirect_uri='+process.env.REDIRECT_URI+'&duration=permanent&scope=read submit identity'}
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
        { loading
          ? 'Loading'
          : username || 'Аноним'
        }
        </Text>
      </div>
    </a>
  );
}