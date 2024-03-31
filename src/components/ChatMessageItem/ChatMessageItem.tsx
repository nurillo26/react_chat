import { FC } from 'react';
import styles from './ChatMessageItem.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface Message {
  senderId: string;
  text: string;
  timestamp: number;
}

const ChatMessageItem: FC<Message> = ({ senderId, text, timestamp }) => {
  const { uid } = useSelector((state: RootState) => state.userData.loggedInUser);

  const formattedDate = new Date(timestamp).toLocaleString();

  return (
    <div
      className={`${styles.message_item_wrap} ${
        uid === senderId ? styles.your_mess : styles.friend_mess
      }`}>
      <span>{text}</span>
      <p className={styles.message_time}>{formattedDate}</p>
    </div>
  );
};

export default ChatMessageItem;
