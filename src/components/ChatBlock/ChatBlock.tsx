import { Outlet, useLocation } from 'react-router-dom';
import styles from './ChatBlock.module.css';
import ChatList from '../ChatList/ChatList';
import ChatWindowEmpty from '../ChatWindowEmpty/ChatWindowEmpty';

const ChatBlock = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.chatblock_wrap}>
      <ChatList />

      {pathname === '/app/chats' ? <ChatWindowEmpty /> : <Outlet />}
    </div>
  );
};

export default ChatBlock;
