import React, {useState} from 'react';
import {View, Text, Switch, Pressable, StyleSheet, Alert} from 'react-native';
import CommonHeader from '../components/CommonHeader';
import auth from '@react-native-firebase/auth';
export default function SettingsScreen({navigation}) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const handleout = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.log('Logout Error:', error.message);
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => handleout()},
      ],
      {cancelable: true},
    );
  };

  return (
    <>
      <CommonHeader title={'Settings'} />
      <View style={styles.container}>
        {/* Notifications Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Enable Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={value => setNotificationsEnabled(value)}
          />
        </View>

        {/* Dark Mode Toggle */}
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Dark Mode</Text>
          <Switch
            style={{color: 'red'}}
            value={darkModeEnabled}
            onValueChange={value => setDarkModeEnabled(value)}
          />
        </View>

        {/* Profile Section */}
        <Pressable
          style={styles.settingItem}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.settingText}>Profile</Text>
        </Pressable>

        {/* Help Section */}
        <Pressable
          style={styles.settingItem}
          onPress={() => navigation.navigate('Help')}>
          <Text style={styles.settingText}>Help & Support</Text>
        </Pressable>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  settingText: {
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#ff6347',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
