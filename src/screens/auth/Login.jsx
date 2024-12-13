import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import {useAuth} from '../../components/AuthContext';
import auth from '@react-native-firebase/auth';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {login} = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  // Handle Login

  const rnBiometrics = new ReactNativeBiometrics();

  // Save login details securely
  const saveLoginDetails = async (email, password) => {
    try {
      await AsyncStorage.setItem(
        'userCredentials',
        JSON.stringify({email, password}),
      );
    } catch (error) {
      console.error('Failed to save credentials:', error);
    }
  };

  // Biometric login logic
  const handleBiometricLogin = async () => {
    try {
      // Start loading
      rnBiometrics.isSensorAvailable().then(async resultObject => {
        const {available, biometryType} = resultObject;
        if (!available) {
          setLoading(false); // Stop loading
          Alert.alert(
            'Error',
            'Biometric authentication is not available on this device.',
          );
          return;
        }
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Confirm your identity',
          cancelButtonText: 'Cancel',
        });

        if (available && biometryType === BiometryTypes.TouchID) {
          alert('TouchID is supported');
        } else if (available && biometryType === BiometryTypes.FaceID) {
          alert('FaceID is supported');
        } else if (available && biometryType === BiometryTypes.Biometrics) {
          alert('Biometrics is supported');
        } else {
          alert('Biometrics not supported');
        }

        if (success) {
          setLoading(true);
          const credentials = await AsyncStorage.getItem('userCredentials');
          if (credentials) {
            const {email, password} = JSON.parse(credentials);

            // Simulate login process
            const userCredential = await auth().signInWithEmailAndPassword(
              email,
              password,
            );
            setLoading(false); // Stop loading
            // Alert.alert(
            //   'Authentication Successful',
            //   `Welcome back, ${userCredential.user.email}!`,
            // );
          } else {
            setLoading(false); // Stop loading
            Alert.alert(
              'Error',
              'No saved credentials found. Please log in with email and password first.',
            );
          }
        } else {
          setLoading(false); // Stop loading
          Alert.alert(
            'Authentication Failed',
            'Biometric authentication was canceled.',
          );
        }
      });
    } catch (error) {
      setLoading(false); // Stop loading
      Alert.alert('Error', error.message);
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '940797699192-rrpcuo3bpd381ld4kv8bln344do080sr.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log({userInfo});
      // const {idToken} = await GoogleSignin.getTokens();
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // const userCredential = await auth().signInWithCredential(
      //   googleCredential,
      // );

      setUser(userCredential.user);
      Alert.alert(
        'Login Success',
        `Welcome ${userCredential.user.displayName}`,
      );
    } catch (error) {
      Alert.alert('Login Error', error.message);
      console.log('error', error);
    }
  };

  // Standard login logic
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      setUser(userCredential.user);

      // Save credentials after successful login
      await saveLoginDetails(email, password);
      setLoading(false);
      Alert.alert('Success', `Welcome, ${userCredential.user.email}!`);
    } catch (error) {
      Alert.alert('Login Error', error.message);
      setLoading(false);
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
          name="user"
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
        {loading ? (
          <ActivityIndicator size={25} color="white" />
        ) : (
          <Text style={styles.textSign}>Log in</Text>
        )}
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

      <TouchableOpacity style={styles.inBut2} onPress={handleBiometricLogin}>
        <FontAwesome name="fingerprint" style={styles.smallIcon} />
        <Text style={styles.textSign2}>Biometric login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.inBut2} onPress={handleGoogleLogin}>
        <FontAwesome name="google" style={styles.smallIcon} />
        <Text style={styles.textSign2}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

// 9e:ba:cc:2d:62:a2:22:f3:7e:17:45:fe:4b:9c:fc:68:fd:e9:e0:69:62:04:71:ac:b1:0c:f4:47:03:3a:98:78
