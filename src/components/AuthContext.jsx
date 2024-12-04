import {React, createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [user, setUser] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return unsubscribe; // Unsubscribe on cleanup
  }, []);

  // Function to handle login
  //   const login = () => {
  //     setIsLoggedIn(true);
  //   };

  //   // Function to handle logout
  //   const logout = () => {
  //     setIsLoggedIn(false);
  //   };
  return (
    <AuthContext.Provider value={{isLoggedIn, user}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
