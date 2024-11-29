import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import {createStackNavigator} from '@react-navigation/stack';
// import PreviewScreen from '../screens/PreviewScreen';
import ReportScreen from '../screens/ReportScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import {StatusBar} from 'react-native';
import WorkoutDetailsScreen from '../screens/WorkoutDetails';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export default function App() {
  const Tabs = () => {
    return (
      <>
        <StatusBar
          backgroundColor="white" // Background color for Android
          barStyle="dark-content" // Content style for both Android and iOS (use "dark-content" for dark text/icons)
        />
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Discover') {
                iconName = focused ? 'barbell' : 'barbell-outline';
              } else if (route.name === 'Report') {
                iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'settings' : 'settings-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: 'white',
              // height: 70,
              paddingBottom: 10,
              height: route.name === 'Camera' ? 0 : 60, // Hide the tab bar on Camera screen
            },
            headerShown: false,
            tabBarHideOnKeyboard: true,
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />

          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Report" component={ReportScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
        </Tab.Navigator>
      </>
    );
  };
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, initialRouteName: 'Tabs'}}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
    </Stack.Navigator>
  );
}
