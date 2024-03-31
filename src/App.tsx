import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

import styles from './App.module.css';
import NavMenu from './components/NavMenu/NavMenu';

import { databaseRef, db, onValue } from './firebase';
import { setAllUsers, setChats } from './redux/chatSlise';

interface ChatData {
  members: string[];
  messages: any;
}

function App() {
  let { pathname } = useLocation();
  const loggedInUser = useSelector((state: RootState) => state.userData.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = JSON.stringify(loggedInUser);
    localStorage.setItem('user', currentUser);

    return () => {
      localStorage.removeItem('user');
    };
  }, [loggedInUser]);

  // получение всех пользователей из БД
  useEffect(() => {
    const usersRef = databaseRef(db, 'users');

    // Создание слушателя для обновлений данных в реальном времени
    onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      const usersList = Object.values(usersData);
      dispatch(setAllUsers(usersList));
    });
  }, []);

  // получение чатов залогиненого пользователя
  useEffect(() => {
    const chatsRef = databaseRef(db, 'chats');
    onValue(chatsRef, (snapshot) => {
      const chatsData = snapshot.val();
      const chatsList = Object.values(chatsData) as ChatData[];

      // Фильтруем чаты, оставляя только те, в котрых есть залогиненный пользователь
      const filteredChats = chatsList.filter((chat) => chat.members.includes(loggedInUser.uid));

      const chatsWithMessages = filteredChats.map((chat) => ({
        ...chat,
        messages: chat.messages || [],
      }));
      dispatch(setChats(chatsWithMessages));
    });
  }, []);

  return (
    <div className={styles.app_wrap}>
      <NavMenu />

      {pathname === '/app' ? (
        <div className={styles.app_left_side}>
          <h1>Hello {loggedInUser.displayName}</h1>
        </div>
      ) : (
        <div className="outlet_side">
          <Outlet />
        </div>
      )}
    </div>
  );
}

export default App;
