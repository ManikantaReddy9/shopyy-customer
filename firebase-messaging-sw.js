/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.11/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDK7l1oqs8Kvz8pi386d5BLBc0DKezE3R4",
  authDomain: "shopyy-orders.firebaseapp.com",
  projectId: "shopyy-orders",
  storageBucket: "shopyy-orders.firebasestorage.app",
  messagingSenderId: "807880285407",
  appId: "1:807880285407:web:b3f2e6d61ed94335221d6a",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
