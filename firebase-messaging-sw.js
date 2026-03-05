importScripts("https://www.gstatic.com/firebasejs/12.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCgMXr-TqIn3jzWNLyBMirtqqdS0JQZN4M",
  authDomain: "fresh-mvp.firebaseapp.com",
  projectId: "fresh-mvp",
  storageBucket: "fresh-mvp.firebasestorage.app",
  messagingSenderId: "274072468506",
  appId: "1:274072468506:web:ae4a41e8a67217f5b9e5a3"
});

const messaging = firebase.messaging();
