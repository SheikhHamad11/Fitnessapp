import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './src/navigation/navigation';
import NavigationBar from 'react-native-navigation-bar-color';
export default function App() {
  React.useEffect(() => {
    try {
      NavigationBar('white', true);

      // Set navigation bar color
    } catch (error) {
      console.error('Navigation Bar Error:', error);
    }
  }, []);
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
