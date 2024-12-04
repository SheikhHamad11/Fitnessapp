import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../components/AuthContext';

const FriendRequestApp = () => {
  const [users, setUsers] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const {user} = useAuth();
  console.log(user.uid);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersSnapshot = await firestore().collection('Users').get();

        if (usersSnapshot.empty) {
          // No users found
          console.log('No users found.');
          setUsers([]); // Optional: Clear the state if no users are found
        } else {
          // Users found
          setUsers(
            usersSnapshot.docs
              .map(doc => ({id: doc.id, ...doc.data()}))
              .filter(userItem => userItem.id !== user.uid),
          );
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    const unsubscribeFriendRequests = firestore()
      .collection('Users')
      .doc(user.uid)
      .onSnapshot(
        docSnapshot => {
          if (docSnapshot.exists) {
            setFriendRequests(docSnapshot.data()?.friendRequestsReceived || []);
            setSentRequests(docSnapshot.data()?.friendRequestsSent || []);
          }
        },
        error => {
          console.error('Error fetching friend requests:', error);
        },
      );

    fetchUsers();
    // fetchFriendRequests();
    return () => unsubscribeFriendRequests();
  }, [user.uid]);

  const sendFriendRequest = async receiverId => {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        friendRequestsSent: firestore.FieldValue.arrayUnion(receiverId),
      });
    Alert.alert(receiverId + '   ' + user.uid);
    await firestore()
      .collection('Users')
      .doc(receiverId)
      .update({
        friendRequestsReceived: firestore.FieldValue.arrayUnion(user.uid),
      });
    setSentRequests(prev => [...prev, receiverId]);
  };

  const cancelFriendRequest = async receiverId => {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        friendRequestsSent: firestore.FieldValue.arrayRemove(receiverId),
      });
    await firestore()
      .collection('Users')
      .doc(receiverId)
      .update({
        friendRequestsReceived: firestore.FieldValue.arrayRemove(user.uid),
      });
    setSentRequests(prev => prev.filter(id => id !== receiverId));
  };

  const acceptFriendRequest = async senderId => {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        friends: firestore.FieldValue.arrayUnion(senderId),
        friendRequestsReceived: firestore.FieldValue.arrayRemove(senderId),
      });
    await firestore()
      .collection('Users')
      .doc(senderId)
      .update({
        friends: firestore.FieldValue.arrayUnion(user.uid),
        friendRequestsSent: firestore.FieldValue.arrayRemove(user.uid),
      });
  };

  const declineFriendRequest = async senderId => {
    await firestore()
      .collection('Users')
      .doc(user.uid)
      .update({
        friendRequestsReceived: firestore.FieldValue.arrayRemove(senderId),
      });
    await firestore()
      .collection('Users')
      .doc(senderId)
      .update({
        friendRequestsSent: firestore.FieldValue.arrayRemove(user.uid),
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{user.email}</Text>
      <Text style={styles.header}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        keyExtractor={item => item}
        ListEmptyComponent={<Text>No friend requests</Text>}
        renderItem={({item}) => (
          <View style={styles.requestContainer}>
            <Text>{item}</Text>
            <TouchableOpacity
              onPress={() => acceptFriendRequest(item)}
              style={styles.button}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => declineFriendRequest(item)}
              style={styles.button}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.header}>All Users</Text>
      <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.userContainer}>
            <Text>{item.email}</Text>
            <TouchableOpacity
              onPress={() =>
                sentRequests.includes(item.id)
                  ? cancelFriendRequest(item.id)
                  : sendFriendRequest(item.id)
              }
              style={[
                styles.button,
                sentRequests.includes(item.id) ? styles.cancelButton : null,
              ]}>
              <Text style={styles.buttonText}>
                {sentRequests.includes(item.id)
                  ? 'Cancel Request'
                  : 'Send Request'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  requestContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  userContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e6f7ff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
  cancelButton: {
    backgroundColor: '#ff4d4d',
  },
});
export default FriendRequestApp;
