import styles from './ChatWindowEmpty.module.css';

const ChatWindowEmpty = () => {
  return (
    <div className={styles.chat_empty_wrap}>
      Отправляйте и получайте сообщения без необходимости оставлять телефон подключённым.
      <br />
      Используйте MaChat одновременно на четырёх связанных устройствах и одном телефоне.
    </div>
  );
};

export default ChatWindowEmpty;
