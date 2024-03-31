import styles from './ChatList.module.css';
import ModalWindow from '../ModalWindow/ModalWindow';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setModalIsOpen } from '../../redux/chatSlise';
import ChatListItem from '../ChatListItem/ChatListItem';
import Skeleton from '@mui/material/Skeleton';

interface UserData {
  displayName: string;
  email: string;
  online: boolean;
  photoURL: string;
  uid: string;
}

interface ChatInfo {
  members: any;
  messages: any;
}

const ChatList = () => {
  const dispatch = useDispatch();
  const modalIsOpen = useSelector((state: RootState) => state.chatSlise.modalIsOpen);
  const allChats = useSelector((state: RootState) => state.chatSlise.chats);
  const allUsers = useSelector((state: RootState) => state.chatSlise.allUsers);
  const loggedInUser = useSelector((state: RootState) => state.userData.loggedInUser);

  return (
    <div className={styles.chat_list_wrap}>
      <div className={styles.chat_list_header}>
        <h2>Чаты :</h2>

        <svg
          onClick={() => dispatch(setModalIsOpen(true))}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2497_26768)">
            <path
              d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 9.00098V15.001"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 12.001H15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_2497_26768">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className={styles.chat_list}>
        {allChats.length === 0
          ? Array(4)
              .fill('')
              .map((_, index) => (
                <div className={styles.chat_item_skeletom} key={index}>
                  <Skeleton
                    animation="wave"
                    sx={{
                      bgcolor: 'grey.700',
                      width: 43,
                      height: 43,
                      borderRadius: '50%',
                      transform: 'scale(1, 1)',
                    }}
                  />

                  <div className={styles.friend_chat_info}>
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: 'grey.700',
                        transform: 'scale(1, 1)',
                        height: 18,
                        width: '60%',
                      }}
                    />
                    <Skeleton
                      animation="wave"
                      sx={{
                        bgcolor: 'grey.700',
                        transform: 'scale(1, 1)',
                        height: 13,
                        width: '80%',
                      }}
                    />
                  </div>
                </div>
              ))
          : allChats.map((chat: ChatInfo, index) => {
              const friendUid = chat.members.find((uid: string) => uid !== loggedInUser.uid);
              const friendData: UserData | undefined = allUsers.find(
                (user: UserData) => user.uid === friendUid,
              );

              const lastMessage: string | undefined = chat.messages?.length
                ? chat.messages[chat.messages.length - 1]?.text
                : undefined;

              if (friendData === undefined) {
                return null;
              }

              // Разобраться с friendData!!!
              return (
                <ChatListItem
                  key={index}
                  {...friendData}
                  lastMessageText={lastMessage || 'Нет сообщений'}
                />
              );
            })}
      </div>

      {modalIsOpen && <ModalWindow />}
    </div>
  );
};

export default ChatList;
