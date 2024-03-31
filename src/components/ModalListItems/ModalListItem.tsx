import { FC } from 'react';
import styles from './ModalListItem.module.css';
import ChatUserAvatar from '../ChatUserAvatar/ChatUserAvatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import { db, databaseRef, databaseSet } from '../../firebase';

interface UserData {
  displayName: string;
  email: string;
  online: boolean;
  photoURL: string;
  uid: string;
}

const ModalListItem: FC<UserData> = ({ displayName, email, online, photoURL, uid }) => {
  const loggedInUser = useSelector((state: RootState) => state.userData.loggedInUser);

  const startNewChat = () => {
    const chatId = databaseRef(db, `chats/${loggedInUser.uid}-${uid}`);

    const chatData = {
      members: [loggedInUser.uid, uid],

      messages: [],
    };

    databaseSet(chatId, chatData);
  };

  return (
    <div className={styles.modal_item_wrap}>
      <div className={styles.user_avatar}>
        <ChatUserAvatar photoURL={photoURL} online={online} />
      </div>

      <div className={styles.user_info}>
        <p>{displayName}</p>
        <p>{email}</p>

        <button
          className={styles.start_chat_btn}
          onClick={() => {
            startNewChat();
          }}>
          Начать чат
        </button>
      </div>
    </div>
  );
};

export default ModalListItem;
