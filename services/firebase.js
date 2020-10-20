const firebase = require('firebase');
require('firebase/firestore');
require('firebase/storage');
const firebaseConfig = {
  apiKey: 'AIzaSyD6rxG3d-GJK-wcvJGyKQzwgOqOKTTFN0Y',
  authDomain: 'employee-app-a1f95.firebaseapp.com',
  databaseURL: 'https://employee-app-a1f95.firebaseio.com',
  projectId: 'employee-app-a1f95',
  storageBucket: 'employee-app-a1f95.appspot.com',
  messagingSenderId: '607845925454',
  appId: '1:607845925454:web:d628a3c246d0744050b91f',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

module.exports = firebase;
