import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthScale,
  heightScale,
  fontScale,
} from '../../../custom/StandardMargin';
import Header from '../../../common/Header';
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomBtn from '../../../custom/CustomBtn';
import {useDispatch} from 'react-redux';
import {addAddress, updateAddress} from '../../../redux/slices/AddressSlice';
import uuid from 'react-native-uuid';

const AddAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [type, setType] = useState(
    route.params.type === 'edit'
      ? route.params.data.type === 'Home'
        ? 1
        : 2
      : 1,
  );
  const [state, setState] = useState(
    route.params.type === 'edit' ? route.params.data.state : '',
  );
  const [city, setCity] = useState(
    route.params.type === 'edit' ? route.params.data.city : '',
  );
  const [pinCode, setPinCode] = useState(
    route.params.type === 'edit' ? route.params.data.pinCode : '',
  );
  const [checkState, setCheckState] = useState<Boolean>(false);
  const [checkCity, setCheckCity] = useState<Boolean>(false);
  const [checkPin, setCheckPin] = useState<Boolean>(false);
  const disPatch = useDispatch();

  const handleState = (text: any) => {
    //let re = /\S+@\S+\.\S+/;
    let regex = /^[a-zA-Z]*$/;

    setState(text);
    if (text.length === 0) {
      setCheckState(true);
    } else {
      setCheckState(false);
    }
  };

  const handleCity = (text: any) => {
    //let re = /\S+@\S+\.\S+/;
    let regex = /^[a-zA-Z]*$/;

    setCity(text);
    if (text.length === 0) {
      setCheckCity(true);
    } else {
      setCheckCity(false);
    }
  };

  const handlePin = (text: any) => {
    //let re = /\S+@\S+\.\S+/;
    let regex = /^[a-zA-Z]*$/;

    setPinCode(text);
    if (text.length === 0) {
      setCheckPin(true);
    } else {
      setCheckPin(false);
    }
  };

  const handleInput = () => {
    if (state.length === 0) {
      Alert.alert("State can't be empty");
    } else if (city.length === 0) {
      Alert.alert("City can't be empty");
    } else if (pinCode.length === 0) {
      Alert.alert("Pin code can't be empty");
    } else {
      if (route.params.type === 'edit') {
        disPatch(
          updateAddress({
            state: state,
            city: city,
            pinCode: pinCode,
            type: type === 1 ? 'Home' : 'Office',
            id: route.params.data.id,
          }),
          navigation.goBack(),
        );
      } else {
        disPatch(
          addAddress({
            state: state,
            city: city,
            pinCode: pinCode,
            type: type === 1 ? 'Home' : 'Office',
            id: uuid.v4(),
          }),
          navigation.goBack(),
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../../Images/left_arrow.png')}
        title={
          route.params.type === 'edit' ? 'Edit New Address' : 'Add New Address'
        }
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <TextInput
        style={[styles.input, {marginTop: heightScale(30)}]}
        placeholder="Enter State"
        value={state}
        onChangeText={text => handleState(text)}
      />
      {checkState ? (
        <Text style={styles.textFailed}>State can not be empty</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter City"
        value={city}
        onChangeText={text => handleCity(text)}
      />
      {checkCity ? (
        <Text style={styles.textFailed}>City can not be empty</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        value={pinCode}
        keyboardType="numeric"
        onChangeText={text => handlePin(text)}
      />
      {checkPin ? (
        <Text style={styles.textFailed}>Pin Code can not be empty</Text>
      ) : (
        <Text style={styles.textFailed}> </Text>
      )}
      <View style={styles.typeView}>
        <TouchableOpacity
          style={[
            styles.touchableTypeView,
            {borderWidth: 0.5, borderColor: type === 1 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            setType(1);
          }}>
          <Image
            source={
              type === 1
                ? require('../../../Images/radio_on_button.png')
                : require('../../../Images/radio_button.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.touchableTypeView,
            {borderWidth: 0.5, borderColor: type === 2 ? 'orange' : 'black'},
          ]}
          onPress={() => {
            setType(2);
          }}>
          <Image
            source={
              type === 2
                ? require('../../../Images/radio_on_button.png')
                : require('../../../Images/radio_button.png')
            }
            style={styles.radio}
          />
          <Text style={styles.radioText}>Office</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: heightScale(10)}}>
        <CustomBtn
          bg={'#FF9A0C'}
          title={'Save Address'}
          color={'white'}
          onClick={() => {
            handleInput();
          }}
        />
      </View>
    </View>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: fontScale(17),
    fontWeight: '600',
    marginTop: heightScale(10),
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    height: heightScale(50),
    borderRadius: widthScale(5),
    borderWidth: widthScale(0.5),
    paddingLeft: widthScale(15),
    marginLeft: widthScale(20),
  },
  typeView: {
    width: '100%',
    flexDirection: 'row',
    marginTop: heightScale(20),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  touchableTypeView: {
    width: '40%',
    height: heightScale(50),
    borderRadius: widthScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: widthScale(10),
  },
  radio: {
    width: widthScale(24),
    height: heightScale(24),
  },
  radioText: {
    fontSize: fontScale(14),
    paddingLeft: widthScale(10),
  },
  textFailed: {
    alignSelf: 'flex-end',
    color: '#FF9A0C',
    paddingRight: widthScale(10),
  },
});
