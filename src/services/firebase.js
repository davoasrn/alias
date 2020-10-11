import database from '@react-native-firebase/database';

const config = {
    apiKey: "AIzaSyDIqEEn4OhnbuP_bX6-eh9aAW3m2iFFpDc",
    authDomain: "alias-cb647.firebaseapp.com",
    databaseURL: "https://alias-cb647.firebaseio.com/"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();