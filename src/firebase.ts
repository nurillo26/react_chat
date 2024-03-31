import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref as databaseRef,
  set as databaseSet,
  update as databaseUpdate,
  get,
  onValue,
  push,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD1wlrxgthFIcWquEt700rivQuU6Diml4o',
  authDomain: 'react-chat-a9f5e.firebaseapp.com',
  databaseURL: 'https://react-chat-a9f5e-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'react-chat-a9f5e',
  storageBucket: 'react-chat-a9f5e.appspot.com',
  messagingSenderId: '1063748601470',
  appId: '1:1063748601470:web:8bfa9ea9be4cd7004eba2f',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {
  app,
  db,
  databaseRef,
  databaseSet,
  databaseUpdate,
  get,
  onValue,
  push,
  query,
  orderByChild,
  equalTo,
};
