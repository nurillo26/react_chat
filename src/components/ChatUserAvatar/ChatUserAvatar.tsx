import { FC } from 'react';
import styles from './ChatUserAvatar.module.css';

interface AvatarProps {
  photoURL: string;
  online: boolean;
}

const ChatUserAvatar: FC<AvatarProps> = ({ photoURL, online }) => {
  return (
    <div className={styles.avatar_wrap}>
      <img src={photoURL ? photoURL : '/menu-icons/avatar.svg'} alt="avatar" />

      <div
        className={`${styles.online_status} ${
          online ? styles.online_user : styles.offline_user
        }`}></div>
    </div>
  );
};

export default ChatUserAvatar;
