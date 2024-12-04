import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
export default function Login() {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();
  return (
    <View style={styles.loginContainer}>
      {/* <Image
        source={require('../../assets/logo.png')}
        style={{width: 100, height: 100, alignSelf: 'center'}}
      /> */}
      <Text style={styles.text_header}>Forgot Password</Text>
      <Text style={styles.text}>
        Reset your access effortlessly and regain control with our password
        recovery service
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

      <TouchableOpacity style={styles.inBut}>
        <Text style={styles.textSign}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
}
