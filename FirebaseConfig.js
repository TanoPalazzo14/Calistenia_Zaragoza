import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  // authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  // messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: process.env.EXPO_PUBLIC_APP_ID,
  // measurementId: "TU_MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth, db }