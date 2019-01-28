importScripts('https://www.gstatic.com/firebasejs/5.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.8.1/firebase-messaging.js');

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA-djv8O8wMZ5E7CCdvfTD8Q2ooZD2Tlig",
    authDomain: "rps-multiplayer-70694.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-70694.firebaseio.com",
    projectId: "rps-multiplayer-70694",
    storageBucket: "rps-multiplayer-70694.appspot.com",
    messagingSenderId: "704443692768"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();

  messaging.setBackgrounMessageHandler(payload => {
      console.log(payload);
      const title = 'hello world';
      const options = {
        body: payload.data.status
      };
      return self.registration.showNotification(title, options);
  });