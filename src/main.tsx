import ReactDOM from 'react-dom/client';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import App from './App';
import Signup from './pages/SignUp';
import SignIn from './pages/SignIn';

import SettingsBlock from './components/SettingsBlock/SettingsBlock';
import ChatBlock from './components/ChatBlock/ChatBlock';

import './index.css';
import ChatWindow from './components/ChatWindow/ChatWindow';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" replace />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/app',
    element: <App />,
    children: [
      {
        path: 'chats',
        element: <ChatBlock />,
        children: [
          {
            path: ':id',
            element: <ChatWindow />,
          },
        ],
      },
      {
        path: 'search',
        element: <h1>Поиск (мб переделать)</h1>,
      },
      {
        path: 'settings',
        element: <SettingsBlock />,
      },
    ],
  },
  {
    path: '*',
    element: <div>Тут будет несуществующая страница</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
