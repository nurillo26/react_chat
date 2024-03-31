import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { db, databaseRef, databaseUpdate, get, query } from '../../firebase';

import EmojiPicker, { Theme } from 'emoji-picker-react';

import styles from './ChatFooter.module.css';

interface ChatFooterProps {
  friendUid: string;
}

const ChatFooter: FC<ChatFooterProps> = ({ friendUid }) => {
  const loggedInUser = useSelector((state: RootState) => state.userData.loggedInUser);
  const [emojiPickerIsOpen, setEmojiPickerIsOpen] = useState(false);
  const [textMessage, setTextMessage] = useState<string>('');

  const handleSendMessage = async () => {
    try {
      const chatsSnapshot = await get(query(databaseRef(db, 'chats')));
      const chatsData = chatsSnapshot.val();

      if (chatsData) {
        const chatKeys = Object.keys(chatsData);
        const chatId = chatKeys.find((key) => {
          const members = chatsData[key].members;
          return members.includes(loggedInUser.uid) && members.includes(friendUid);
        });

        if (chatId) {
          const chatRef = databaseRef(db, `chats/${chatId}`);
          const messageData = {
            senderId: loggedInUser.uid,
            text: textMessage,
            timestamp: Date.now(),
          };

          const chatMessages = chatsData[chatId].messages || [];

          await databaseUpdate(chatRef, { messages: [...chatMessages, messageData] });
          setTextMessage('');
        } else {
          console.log('Chat not found.');
        }
      } else {
        console.log('No chats found.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const onEmojiClick = ({ emoji }: { emoji: string }) => setTextMessage(`${textMessage}${emoji}`);

  return (
    <div className={styles.chat_footer}>
      <div className={styles.chat_footer_input}>
        <input
          type="text"
          placeholder="Ваше сообщение"
          onChange={(e) => setTextMessage(e.target.value)}
          value={textMessage}
        />

        {/* Emoji icon btn */}
        <div className={styles.emoji_btn}>
          {!emojiPickerIsOpen ? (
            <svg
              onClick={() => setEmojiPickerIsOpen((prevValue) => !prevValue)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z"
                fill="#fff"
              />
              <path
                d="M8.81994 9.74994C7.96994 9.74994 7.11994 9.42994 6.46994 8.77994C6.17994 8.48994 6.17994 8.00994 6.46994 7.71994C6.75994 7.42994 7.23994 7.42994 7.52994 7.71994C8.23994 8.42994 9.39994 8.42994 10.1099 7.71994C10.3999 7.42994 10.8799 7.42994 11.1699 7.71994C11.4599 8.00994 11.4599 8.48994 11.1699 8.77994C10.5199 9.41994 9.66994 9.74994 8.81994 9.74994Z"
                fill="#fff"
              />
              <path
                d="M15.1798 9.74994C14.3298 9.74994 13.4798 9.42994 12.8298 8.77994C12.5398 8.48994 12.5398 8.00994 12.8298 7.71994C13.1198 7.42994 13.5998 7.42994 13.8898 7.71994C14.5998 8.42994 15.7598 8.42994 16.4698 7.71994C16.7598 7.42994 17.2398 7.42994 17.5298 7.71994C17.8198 8.00994 17.8198 8.48994 17.5298 8.77994C16.8798 9.41994 16.0298 9.74994 15.1798 9.74994Z"
                fill="#fff"
              />
              <path
                d="M12 19.15C9.1 19.15 6.75 16.79 6.75 13.9C6.75 12.99 7.49 12.25 8.4 12.25H15.6C16.51 12.25 17.25 12.99 17.25 13.9C17.25 16.79 14.9 19.15 12 19.15ZM8.4 13.75C8.32 13.75 8.25 13.82 8.25 13.9C8.25 15.97 9.93 17.65 12 17.65C14.07 17.65 15.75 15.97 15.75 13.9C15.75 13.82 15.68 13.75 15.6 13.75H8.4Z"
                fill="#fff"
              />
            </svg>
          ) : (
            <svg
              onClick={() => setEmojiPickerIsOpen((prevValue) => !prevValue)}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2497_26541)">
                <path
                  d="M7 7L17 17M7 17L17 7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2497_26541">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          )}

          {emojiPickerIsOpen && (
            <EmojiPicker
              className={styles.emoji_picker_comp}
              height={400}
              searchDisabled
              theme={Theme.DARK}
              onEmojiClick={onEmojiClick}
            />
          )}
        </div>

        {/* Doc icon btn */}
        <svg
          className={styles.docs_btn}
          width="14"
          height="24"
          viewBox="0 0 14 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1 13L1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7V15C13 17.2091 11.2091 19 9 19C6.79086 19 5 17.2091 5 15L5 7C5 5.89543 5.89543 5 7 5C8.10457 5 9 5.89543 9 7V15"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <button className={styles.chat_footer_send_btn} onClick={handleSendMessage}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10.3078 13.6923L15.1539 8.84619M20.1113 5.88867L16.0207 19.1833C15.6541 20.3747 15.4706 20.9707 15.1544 21.1683C14.8802 21.3396 14.5406 21.3683 14.2419 21.2443C13.8975 21.1014 13.618 20.5433 13.0603 19.428L10.4694 14.2461C10.3809 14.0691 10.3366 13.981 10.2775 13.9043C10.225 13.8363 10.1645 13.7749 10.0965 13.7225C10.0215 13.6647 9.93486 13.6214 9.76577 13.5369L4.57192 10.9399C3.45662 10.3823 2.89892 10.1032 2.75601 9.75879C2.63207 9.4601 2.66033 9.12023 2.83169 8.84597C3.02928 8.52974 3.62523 8.34603 4.81704 7.97932L18.1116 3.88867C19.0486 3.60038 19.5173 3.45635 19.8337 3.57253C20.1094 3.67373 20.3267 3.89084 20.4279 4.16651C20.544 4.48283 20.3999 4.95126 20.1119 5.88729L20.1113 5.88867Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatFooter;
