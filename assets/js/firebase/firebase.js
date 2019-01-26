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

  const database = firebase.database();