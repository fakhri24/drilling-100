// firebase-config.js
// Firebase client-side config — API key ini AMAN di-expose (dibatasi domain di Firebase Console)
// Keamanan sesungguhnya di Firestore security rules

const firebaseConfig = {
  apiKey: "AIzaSyCHo6qZEy3nc7rCv_ih6tG3d_Cab-kvQUM",
  authDomain: "drilling-100.firebaseapp.com",
  projectId: "drilling-100",
  storageBucket: "drilling-100.firebasestorage.app",
  messagingSenderId: "870786380567",
  appId: "1:870786380567:web:492f58a4105b43f9e13d52",
  measurementId: "G-VRFK4ZH4KL",
};

// Initialize Firebase (compat SDK — sesuai dengan CDN script tags di HTML)
firebase.initializeApp(firebaseConfig);

// Services
const auth = firebase.auth();
const db = firebase.firestore();
