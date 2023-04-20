import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import {
  widthScale,
  heightScale,
  fontScale,
} from '../../../custom/StandardMargin';
import Header from '../../../common/Header';
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteAddress} from '../../../redux/slices/AddressSlice';
const {height, width} = Dimensions.get('window');

const Addresses = () => {
  const navigation = useNavigation();
  const addressList = useSelector(state => state.address.data);

  const isFocused = useIsFocused();
  const disPatch = useDispatch();

  useEffect(() => {
    console.log(addressList);
  }, [isFocused]);

  const saveAddress = async item => {
    await AsyncStorage.setItem(
      'MY_ADDRESS',
      ' ' +
        item.city +
        ', ' +
        item.state +
        ', ' +
        item.pinCode +
        ',Type:- ' +
        item.type,
    );
    navigation.goBack();
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          saveAddress(item);
        }}>
        <View style={styles.innerView}>
          <Text style={styles.name}>{`State: ${item.state}`}</Text>
          <Text style={styles.name}>{`City: ${item.city}`}</Text>
          <Text style={styles.name}>{`PinCode: ${item.pinCode}`}</Text>
          <Text style={[styles.name, styles.typeView]}>{item.type}</Text>
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={[
                styles.bottomIcon,
                {marginRight: widthScale(10), marginTop: heightScale(1)},
              ]}
              onPress={() => {
                navigation.navigate('AddAddress', {type: 'edit', data: item});
              }}>
              <Image
                source={require('../../../Images/draw.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomIcon}
              onPress={() => {
                disPatch(deleteAddress(item));
              }}>
              <Image
                source={require('../../../Images/delete.png')}
                style={styles.bottomIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const listViewItemSeparator = () => {
    return <View style={styles.SeparatorView} />;
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../../Images/left_arrow.png')}
        title={'My Address'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={addressList}
        renderItem={renderItem}
        maxToRenderPerBatch={10}
        ItemSeparatorComponent={listViewItemSeparator}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          navigation.navigate('AddAddress', {type: 'new'});
        }}>
        <Text style={styles.plusText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Addresses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  SeparatorView: {
    height: heightScale(10),
    width: '100%',
  },
  productItem: {
    width: width,
    height: heightScale(120),
    marginTop: heightScale(10),
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  title: {
    color: 'black',
    fontSize: fontScale(17),
    fontWeight: '600',
    marginTop: heightScale(10),
    alignSelf: 'center',
  },
  innerView: {
    width: '90%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: heightScale(20),
    borderRadius: widthScale(10),
    padding: widthScale(10),
  },
  name: {
    fontSize: fontScale(15),
    fontWeight: '400',
    color: 'black',
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
  user: {
    resizeMode: 'center',
    alignSelf: 'center',
    width: widthScale(100),
    height: heightScale(100),
    marginTop: heightScale(40),
  },
  tab: {
    width: '90%',
    height: heightScale(50),
    borderBottomWidth: widthScale(0.5),
    alignSelf: 'center',
    borderBottomColor: 'black',
    paddingLeft: widthScale(20),
    justifyContent: 'center',
  },
  txt: {
    color: 'black',
  },
  addButton: {
    width: widthScale(40),
    height: heightScale(40),
    backgroundColor: '#EC8A00',
    borderRadius: widthScale(20),
    position: 'absolute',
    bottom: heightScale(50),
    right: widthScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    fontSize: fontScale(25),
    color: 'white',
  },
  bottomView: {
    position: 'absolute',
    right: widthScale(10),
    bottom: heightScale(10),
    flexDirection: 'row',
  },
  bottomIcon: {
    width: widthScale(16),
    height: heightScale(16),
    resizeMode: 'center',
  },
  typeView: {
    position: 'absolute',
    right: widthScale(10),
    top: heightScale(10),
    backgroundColor: 'orange',
    color: 'white',
    padding: widthScale(5),
    borderRadius: widthScale(5),
    fontSize: fontScale(10),
    fontWeight: '500',
  },
});
