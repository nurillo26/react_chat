import { FC } from 'react';
import styles from './ChatListItem.module.css';
import ChatUserAvatar from '../ChatUserAvatar/ChatUserAvatar';
import { NavLink } from 'react-router-dom';

interface ChatListItemProps {
  displayName: string;
  email: string;
  online: boolean;
  photoURL: string;
  uid: string;
  lastMessageText: string;
}

const ChatListItem: FC<ChatListItemProps> = ({
  displayName,
  online,
  photoURL,
  uid,
  lastMessageText,
}) => {
  return (
    <NavLink to={uid} className={({ isActive }) => (isActive ? styles.actvie_chat : '')}>
      <div className={styles.chat_list_item_wrap}>
        <ChatUserAvatar photoURL={photoURL} online={online} />

        <div className={styles.friend_chat_info}>
          <div className={styles.friend_chat_name}>{displayName}</div>
          <div className={styles.friend_chat_last_message}>{lastMessageText}</div>
        </div>
      </div>
    </NavLink>
  );
};

export default ChatListItem;
