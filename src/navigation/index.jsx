import React, {useState} from 'react';
import MainApp from './navigation';
import Auth from './AuthStack';
import {useAuth} from '../components/AuthContext';

export default function Routes() {
  const {user} = useAuth();

  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  return user ? <MainApp /> : <Auth />;
}
