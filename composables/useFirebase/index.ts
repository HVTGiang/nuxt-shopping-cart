import { browserLocalPersistence, initializeAuth, type Auth } from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import config from './firebase.config'

let app: FirebaseApp, auth: Auth, storage: FirebaseStorage

if (!getApps().length) {
  try {
    app = initializeApp(config)
    auth = initializeAuth(app, { persistence: browserLocalPersistence })
    storage = getStorage(app)
  } catch (err) {
    console.log('Error when initializing app: ' + err)
  }
} else {
  app = getApp()
  auth = getAuth(app)
  storage = getStorage(app)
}

// Initialize Firebase

// Initialize Cloud Firestore and get a reference to the service
export const database = getFirestore(app!)

export default function useFirebase() {
  return {
    database,
    auth,
    storage,
    app
  }
}
