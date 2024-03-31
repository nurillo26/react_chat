import { useParams } from 'react-router-dom';
import styles from './ChatWindow.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ChatMessageItem from '../ChatMessageItem/ChatMessageItem';
import ChatFooter from '../ChatFooter/ChatFooter';

interface UserData {
  displayName: string;
  email: string;
  online: boolean;
  photoURL: string;
  uid: string;
  lastMessageText: string;
}

const ChatWindow = () => {
  const { id } = useParams();
  const allUsers = useSelector((state: RootState) => state.chatSlise.allUsers);
  const allChats = useSelector((state: RootState) => state.chatSlise.chats);

  const selectedFriendInfo = allUsers.find((user: UserData) => user.uid === id);
  const selectedFriendMessages = allChats
    .filter((chat) => chat.members.includes(id))
    .flatMap((chat) => chat.messages);

  return (
    <div className={styles.chat_window_wrap}>
      <div className={styles.chat_head}>
        <div className={styles.chat_head_userdata}>
          <div className={styles.chat_head_userdata_ava}>
            <img
              src={
                selectedFriendInfo.photoURL !== ''
                  ? selectedFriendInfo.photoURL
                  : '/menu-icons/avatar.svg'
              }
              alt="ava"
            />
          </div>

          <div className={styles.chat_head_userdata_info}>
            <p>{selectedFriendInfo.displayName}</p>
            <p
              className={`${styles.chat_user_status} ${
                selectedFriendInfo.online ? styles.status_online : ''
              }`}>
              {selectedFriendInfo.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className={styles.chat_head_call_icons}>
          <button className={styles.call_icon_btn}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.5063 4.95952C15.0666 10.6147 10.6147 15.0666 4.95953 16.5063C2.81867 17.0513 1 15.2091 1 13V12C1 11.4477 1.44883 11.0053 1.99842 10.9508C2.92696 10.8587 3.81815 10.6397 4.65438 10.3112L6.17366 11.8305C8.6447 10.648 10.648 8.64471 11.8305 6.17367L10.3112 4.65438C10.6397 3.81816 10.8587 2.92696 10.9508 1.99842C11.0053 1.44883 11.4477 1 12 1H13C15.2091 1 17.0513 2.81867 16.5063 4.95952Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.chat_body}>
        {selectedFriendMessages !== undefined && selectedFriendMessages.length > 0 ? (
          selectedFriendMessages.map((message, index) => (
            <ChatMessageItem key={index} {...message} />
          ))
        ) : (
          <p className={styles.start_dialog_message}>Начните свой диалог</p>
        )}
      </div>

      {/* Доделать инпут для отправки сообщения */}
      <ChatFooter friendUid={selectedFriendInfo.uid} />
    </div>
  );
};

export default ChatWindow;
