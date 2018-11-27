
  var config = {
    apiKey: "AIzaSyCYXNUKRhpgYbHqrXwuhazPRUcKYqhzM-E",
    authDomain: "evendar-484c7.firebaseapp.com",
    databaseURL: "https://evendar-484c7.firebaseio.com",
    projectId: "evendar-484c7",
    storageBucket: "evendar-484c7.appspot.com",
    messagingSenderId: "279832144780"
  };
  firebase.initializeApp(config);
  app_firebase = firebase;


 var db = firebase.firestore();

 db.settings({
    timestampsInSnapshots: true
  });
  const listEventsRef = db.collection("events").orderBy("unixTime")
  const carouselEventsRef = db.collection("events").orderBy("unixTime")
  const usersRef = db.collection("users")



