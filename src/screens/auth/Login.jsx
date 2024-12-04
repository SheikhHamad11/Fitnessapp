import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import {useAuth} from '../../components/AuthContext';
import auth from '@react-native-firebase/auth';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {login} = useAuth();
  const [user, setUser] = useState(null);
  // Handle Login
  const handleLogin = async () => {
    if (!email && !password) {
      Alert.alert('Please Fill both', 'Error');
      return;
    }
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setUser(userCredential.user);
      Alert.alert('Success', 'User logged in successfully!');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View style={styles.loginContainer}>
      {/* <Image
        source={require('../../assets/logo.png')}
        style={{width: 100, height: 100, alignSelf: 'center'}}
      /> */}
      <Text style={styles.text_header}>Sign In</Text>
      <Text style={styles.text}>
        Stay connected, follow teams, and never miss thrilling, Stay connected
      </Text>
      <Text style={styles.text2}>Email</Text>
      <View style={styles.action}>
        <FontAwesome
          name="user-o"
          size={25}
          color="black"
          style={styles.smallIcon}
        />

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor={'rgba(0,0,0,0.8)'}
          style={styles.textInput}
          onChange={e => setEmail(e.nativeEvent.text)}
        />
      </View>
      <Text style={styles.text2}>Password</Text>
      <View style={styles.action}>
        <FontAwesome
          name="lock"
          size={25}
          color="black"
          style={styles.smallIcon}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor={'rgba(0,0,0,0.8)'}
          style={styles.textInput}
          onChange={e => setPassword(e.nativeEvent.text)}
        />
      </View>
      <View style={styles.forget}>
        <Text
          style={{color: 'gray', fontWeight: '700'}}
          onPress={() => navigation.navigate('ForgetPassword')}>
          Forgot Password
        </Text>
      </View>
      <TouchableOpacity style={styles.inBut} onPress={handleLogin}>
        <Text style={styles.textSign}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text style={{fontSize: 14, fontWeight: 'bold', color: '#919191'}}>
          Don't have an Account
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{color: 'black', marginLeft: 4}}>Sign Up here</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.continuewith}>----Or Continue with----</Text>
      <View style={styles.inBut2}>
        <FontAwesome name="google" style={styles.smallIcon} />
        <TouchableOpacity>
          <Text style={styles.textSign2}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inBut2}>
        <FontAwesome name="apple" style={styles.smallIcon} />
        <TouchableOpacity>
          <Text style={styles.textSign2}>Continue with Apple</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
