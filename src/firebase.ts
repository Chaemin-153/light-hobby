import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase 설정 객체
const firebaseConfig = {
  apiKey: 'AIzaSyDcuNJLa6HZywpUIadSOqnYEAk9Na1ftdI',
  authDomain: 'light-hobby.firebaseapp.com',
  projectId: 'light-hobby',
  storageBucket: 'light-hobby.firebasestorage.app',
  messagingSenderId: '281170340037',
  appId: '1:281170340037:web:b320dd38bb81efe3da68ac',
  measurementId: 'G-WQB5YNJ2R3',
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 서비스 초기화
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };
