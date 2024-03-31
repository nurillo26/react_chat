import { LoggedInUser } from '../redux/userDataSlice';

export const getUserFromLS = () => {
  const data = localStorage.getItem('user');
  const user: LoggedInUser = data ? JSON.parse(data) : {};
  return user;
};
