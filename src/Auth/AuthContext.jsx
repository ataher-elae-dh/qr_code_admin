// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Firebase config for PMS25
const firebaseConfig = {
  apiKey: "AIzaSyBeThQQJ-t5IXBbcDdOPA2dxNJi3ysGY8I",
  authDomain: "pms25-1c91c.firebaseapp.com",
  projectId: "pms25-1c91c",
  storageBucket: "pms25-1c91c.appspot.com",
  messagingSenderId: "830208291199",
  appId: "1:830208291199:web:YOUR_APP_ID", // replace YOUR_APP_ID with your actual appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Create Auth Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  // Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Logout
  const logout = () => signOut(auth);

  // Observe user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
