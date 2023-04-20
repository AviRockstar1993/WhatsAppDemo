import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomBtn from '../../custom/CustomBtn';

import {widthScale, heightScale, fontScale} from '../../custom/StandardMargin';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {auth} from '../../../firebase';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import '../../../language/i18n';
import {useDispatch} from 'react-redux';
import {addDataToRedux} from '../../redux/slices/LoginDetailSlice';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [checkPass, setCheckPass] = useState<Boolean>(false);
  const [checkValidEmail, setCheckValidEmail] = useState<Boolean>(false);
  const [securePassword, setSecurePassword] = useState(true);
  const {t} = useTranslation();
  const disPatch = useDispatch();

  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setEmail(text);

    if (text.length === 0) {
      setCheckValidEmail(false);
    }
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };
  const handlePass = (value: any) => {
    setPass(value);
    if (value.length < 8) {
      setCheckPass(true);
    } else {
      setCheckPass(false);
    }
  };

  const loginUser = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(user => {
        console.log(user.user.uid);
        AsyncStorage.setItem('LOGGED_IN', user.user.uid);
        disPatch(addDataToRedux(user.user.uid));
        // If server response message same as Data Matched
        if (user) {
          navigation.replace('User');
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          Alert.alert(error.message);
        } else if (error.code === 'auth/user-not-found') {
          Alert.alert('No User Found');
        } else {
          Alert.alert('Please check your email id or password');
        }
      });
    // firestore()
    //   .collection('Users')
    //   // Filter results
    //   .where('email', '==', email)
    //   .get()
    //   .then(async querySnapshot => {
    //     console.log(querySnapshot.docs[0]._data);
    //     Alert.alert('Login success');
    //     navigation.navigate('User');
    //     setLoggedIn(email);
    //     await AsyncStorage.setItem('IS_USER_LOGGED_IN', email);
    //   });
  };

  const handleInput = () => {
    let regex = /^[a-zA-Z]*$/;
    let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailValidate.test(email)) {
      Alert.alert(t('Alert email'));
    } else if (pass.length === 0) {
      Alert.alert(t('password'));
    } else {
      loginUser();
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Login')}</Text>

      <TextInput
        placeholder="enter email"
        style={styles.input}
        value={email}
        onChangeText={text => handleCheckEmail(text)}
      />
      {checkValidEmail ? (
        <Text style={styles.textFailed}>{t('enter valid email')}</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}

      <View style={styles.inputRowWrapper}>
        <TextInput
          placeholder="Enter password"
          value={pass}
          returnKeyType="done"
          blurOnSubmit={true}
          onChangeText={handlePass}
          secureTextEntry={securePassword}
          style={{color: '#000000', width: '90%'}}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSecurePassword(!securePassword)}>
          <Image
            source={
              securePassword
                ? require('../../Images/eye.png')
                : require('../../Images/eye_slash.png')
            }
            style={[styles.iconStyling, {opacity: 0.4}]}
          />
        </TouchableOpacity>
      </View>

      {checkPass ? (
        <Text style={styles.textFailed}>Please enter valid password</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}

      <CustomBtn
        bg={'#FF9A0C'}
        title={'Login'}
        color={'white'}
        onClick={() => {
          handleInput();
        }}
      />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('SignUp')}>
        New User? Register Here
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: fontScale(25),
    fontWeight: '600',
    marginTop: heightScale(20),
    marginLeft: widthScale(20),
  },
  iconStyling: {
    height: heightScale(fontScale(25)),
    width: widthScale(fontScale(25)),
    marginRight: widthScale(10),
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: '#FF9A0C',
    paddingRight: widthScale(10),
  },
  input: {
    width: '90%',
    height: heightScale(50),
    borderRadius: widthScale(5),
    borderWidth: widthScale(0.5),
    paddingLeft: widthScale(15),
    marginLeft: widthScale(20),
    marginTop: heightScale(20),
  },
  loginText: {
    color: 'black',
    fontSize: fontScale(16),
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: heightScale(15),
    textDecorationLine: 'underline',
  },
  inputRowWrapper: {
    flexDirection: 'row',
    height: heightScale(50),
    width: '90%',
    borderWidth: widthScale(0.5),
    borderColor: '#000000',
    borderRadius: widthScale(5),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: widthScale(15),
    marginLeft: widthScale(20),
    marginTop: heightScale(10),
  },
});
