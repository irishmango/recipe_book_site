// Remove these v8 imports:
// import firebase from 'firebase/app'
// import 'firebase/firestore'

import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDW6F0uiUskFKGHhppqI1r-RbZvSk1jmhk',
    authDomain: 'ninja-cooking-app-f798d.firebaseapp.com',
    projectId: 'ninja-cooking-app-f798d',
    storageBucket: 'ninja-cooking-app-f798d.firebasestorage.app',
    messagingSenderId: '523226361440',
    appId: '1:523226361440:web:a206d91696975a3ede5d05'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)