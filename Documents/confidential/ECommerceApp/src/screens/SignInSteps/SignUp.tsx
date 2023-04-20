import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {widthScale, heightScale, fontScale} from '../../custom/StandardMargin';
import CustomBtn from '../../custom/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {auth} from '../../../firebase';
import auth from '@react-native-firebase/auth';

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirm, setSecureConfirm] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState<Boolean>(false);
  const [checkName, setCheckName] = useState<Boolean>(false);
  const [checkPass, setCheckPass] = useState<Boolean>(false);
  const [checkConfirmPass, setCheckConfirmPass] = useState<Boolean>(false);
  const [checkNumber, setCheckNumber] = useState<Boolean>(false);
  const navigation = useNavigation();

  const handleName = (text: any) => {
    //let re = /\S+@\S+\.\S+/;
    let regex = /^[a-zA-Z]*$/;

    setName(text);
    if (!regex.test(text) || text.length === 0) {
      setCheckName(true);
    } else {
      setCheckName(false);
    }
  };
  const handleCheckEmail = (text: any) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    setEmail(text);
    const emailSave = AsyncStorage.setItem('storeEmail', text);
    console.log('Email', emailSave);
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
  const handleConfirmPass = (value: any) => {
    setConfirmPass(value);
    if (value.length < 8) {
      setCheckConfirmPass(true);
    } else {
      setCheckConfirmPass(false);
    }
  };

  const numberhandle = (text: any) => {
    setNumber(text);

    if (text.length === 0 || text.length < 10) {
      setCheckNumber(true);
    } else {
      setCheckNumber(false);
    }
    setNumber(text.length > 10 ? text.slice(0, 10) : text);
  };

  const addRegisteredUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);
        Alert.alert('User added!');
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert(error.message);
      });
    // firestore()
    //   .collection('Users')
    //   .add({
    //     name: name,
    //     email: email,
    //     mobile: number,
    //     password: pass,
    //   })
    //   .then(() => {
    //     Alert.alert('User added!');
    //     navigation.navigate('Login');
    //   });
  };

  const handleInput = () => {
    let regex = /^[a-zA-Z]*$/;
    let emailValidate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (name.length === 0) {
      Alert.alert("Name can't be empty");
    } else if (!regex.test(name)) {
      Alert.alert("Name can't contain numeric value");
    } else if (!emailValidate.test(email)) {
      Alert.alert("Email can't matched");
    } else if (number.length === 0 || number.length < 10) {
      Alert.alert("Number can't be empty");
    } else if (pass.length === 0) {
      Alert.alert("Password can't be empty");
    } else if (confirmPass.length === 0) {
      Alert.alert("Confirm Password can't be empty");
    } else if (pass !== confirmPass) {
      Alert.alert('Confirm Password should be same as password');
    } else {
      addRegisteredUser();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>

      <TextInput
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={handleName}
      />
      {checkName ? (
        <Text style={styles.textFailed}>Please enter valid name</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <TextInput
        placeholder="Enter email"
        style={styles.input}
        value={email}
        onChangeText={handleCheckEmail}
      />
      {checkValidEmail ? (
        <Text style={styles.textFailed}>Please enter valid email id</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}

      <TextInput
        placeholder="Enter mobile"
        style={styles.input}
        value={number}
        keyboardType="number-pad"
        onChangeText={text => numberhandle(text.replace(/[^0-9]/g, ''))}
      />
      {checkNumber ? (
        <Text style={styles.textFailed}>Please enter valid phone number</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.inputRowWrapper}>
        <TextInput
          placeholder="Enter password"
          value={pass}
          style={{width: '90%'}}
          returnKeyType="done"
          blurOnSubmit={true}
          onChangeText={handlePass}
          secureTextEntry={securePassword}
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

      <View style={styles.inputRowWrapper}>
        <TextInput
          placeholder="Enter confirm password"
          onChangeText={handleConfirmPass}
          returnKeyType="done"
          style={{width: '90%'}}
          secureTextEntry={secureConfirm}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setSecureConfirm(!secureConfirm)}>
          <Image
            source={
              secureConfirm
                ? require('../../Images/eye.png')
                : require('../../Images/eye_slash.png')
            }
            style={[styles.iconStyling, {opacity: 0.4}]}
          />
        </TouchableOpacity>
      </View>

      {checkConfirmPass ? (
        <Text style={styles.textFailed}>Confirm password can't be matched</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <CustomBtn
        bg={'#FF9A0C'}
        title={'Sign Up'}
        color={'white'}
        onClick={() => {
          handleInput();
        }}
      />

      <Text
        style={styles.loginText}
        onPress={() => navigation.navigate('Login')}>
        already have an account? Please Login
      </Text>
    </ScrollView>
  );
};

export default SignUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  iconStyling: {
    height: heightScale(25),
    width: widthScale(25),
    marginRight: widthScale(10),
  },
  title: {
    color: 'black',
    fontSize: 25,
    fontWeight: '600',
    marginTop: heightScale(20),
    marginLeft: widthScale(20),
  },
  input: {
    width: '90%',
    height: heightScale(50),
    borderRadius: widthScale(5),
    borderWidth: widthScale(0.5),
    paddingLeft: widthScale(15),
    marginLeft: widthScale(20),
    marginTop: heightScale(10),
  },
  loginText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: heightScale(15),
    textDecorationLine: 'underline',
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: '#FF9A0C',
    paddingRight: widthScale(10),
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
