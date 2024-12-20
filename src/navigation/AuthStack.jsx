import React from 'react';
import Login from '../screens/auth/Login';
import {createStackNavigator} from '@react-navigation/stack';
import Register from '../screens/auth/Register';
import ForgetPassword from '../screens/auth/ForgetPassword';

export default function Auth() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}
