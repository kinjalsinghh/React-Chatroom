import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNE0JCxPIDkIAFP8qcI77eGaqfQOxa0dY",
  authDomain: "chat-room-4ffc1.firebaseapp.com",
  databaseURL: "https://chat-room-4ffc1-default-rtdb.firebaseio.com",
  projectId: "chat-room-4ffc1",
  storageBucket: "chat-room-4ffc1.appspot.com",
  messagingSenderId: "665130847047",
  appId: "1:665130847047:web:6830725da1219fd0bb9a62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
