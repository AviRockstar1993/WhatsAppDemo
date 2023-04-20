import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  widthScale,
  heightScale,
  fontScale,
} from '../../../custom/StandardMargin';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Header from '../../../common/Header';
import {useDispatch, useSelector} from 'react-redux';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../../../redux/slices/CartSlice';
import CustomBtn from '../../../custom/CustomBtn';
const {height, width} = Dimensions.get('window');
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const Checkout = () => {
  const navigation = useNavigation();
  const disPatch = useDispatch();
  const cartItem = useSelector(state => state.cart);
  const {t} = useTranslation();
  const isFocused = useIsFocused();

  const [cartList, setCartList] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const [selectedAddress, setselectedAddress] = useState(
    'Please select address',
  );
  useEffect(() => {
    setCartList(cartItem.data);
  }, [cartItem]);

  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };

  useEffect(() => {
    getSelectedAddress();
  }, [isFocused]);

  const getSelectedAddress = async () => {
    setselectedAddress(await AsyncStorage.getItem('MY_ADDRESS'));
    console.log(selectedAddress);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.productItem}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <View style={styles.innerView}>
            <Text style={styles.name}>
              {item.title.length > 30
                ? item.title.substring(0, 30) + '...'
                : item.title}
            </Text>
            <Text style={styles.desc}>
              {item.description.length > 30
                ? item.description.substring(0, 30) + '...'
                : item.description}
            </Text>
            <View style={styles.qtyView}>
              <Text style={styles.price}>{'$ ' + item.price * item.qty}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  if (item.qty > 1) {
                    disPatch(reduceItemFromCart(item));
                  } else {
                    disPatch(removeItemFromCart(index));
                  }
                }}>
                <Text style={styles.decrement}>-</Text>
              </TouchableOpacity>
              <Text style={styles.Qty}>{item.qty}</Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  disPatch(addItemToCart(item));
                }}>
                <Text style={styles.decrement}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const listViewItemSeparator = () => {
    return <View style={styles.SeparatorView} />;
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Header
          leftIcon={require('../../../Images/left_arrow.png')}
          title={t('Checkout')}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.items}>Added Items</Text>
        <View style={{marginTop: heightScale(10)}}>
          <FlatList
            data={cartList}
            renderItem={renderItem}
            ItemSeparatorComponent={listViewItemSeparator}
          />
        </View>
        <View style={styles.totalView}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.totalAmount}>{'$' + getTotal()}</Text>
        </View>
        <Text style={[styles.total, {marginTop: heightScale(15)}]}>
          {' Select Payment mode'}
        </Text>
        <View style={styles.paymentMethod}>
          <TouchableOpacity
            onPress={() => {
              setSelectedMethod(1);
            }}>
            <Image
              source={
                selectedMethod === 1
                  ? require('../../../Images/radio_on_button.png')
                  : require('../../../Images/radio_button.png')
              }
              style={[
                styles.img,
                {tintColor: selectedMethod === 1 ? 'orange' : 'black'},
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.radio_item}>Credit Card</Text>
        </View>

        <View style={styles.paymentMethod}>
          <TouchableOpacity
            onPress={() => {
              setSelectedMethod(2);
            }}>
            <Image
              source={
                selectedMethod === 2
                  ? require('../../../Images/radio_on_button.png')
                  : require('../../../Images/radio_button.png')
              }
              style={[
                styles.img,
                {tintColor: selectedMethod === 2 ? 'orange' : 'black'},
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.radio_item}>Debit Card</Text>
        </View>

        <View style={styles.paymentMethod}>
          <TouchableOpacity
            onPress={() => {
              setSelectedMethod(3);
            }}>
            <Image
              source={
                selectedMethod === 3
                  ? require('../../../Images/radio_on_button.png')
                  : require('../../../Images/radio_button.png')
              }
              style={[
                styles.img,
                {
                  tintColor: selectedMethod == 3 ? 'orange' : 'black',
                },
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.radio_item}>UPI</Text>
        </View>
        <View style={styles.paymentMethod}>
          <TouchableOpacity
            onPress={() => {
              setSelectedMethod(4);
            }}>
            <Image
              source={
                selectedMethod === 4
                  ? require('../../../Images/radio_on_button.png')
                  : require('../../../Images/radio_button.png')
              }
              style={[
                styles.img,
                {tintColor: selectedMethod == 4 ? 'orange' : 'black'},
              ]}
            />
          </TouchableOpacity>
          <Text style={styles.radio_item}>Cash on Delivery</Text>
        </View>
        <View style={styles.addressView}>
          <Text style={[styles.items, {fontSize: fontScale(14)}]}>Address</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
            <Text
              style={[
                styles.items,
                {
                  fontSize: fontScale(14),
                  textDecorationLine: 'underline',
                  color: 'lightblue',
                },
              ]}>
              Edit Address
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.items,
            {
              marginTop: heightScale(5),
              fontSize: fontScale(13),
              color: '#636363',
            },
          ]}>
          {selectedAddress}
        </Text>
        <CustomBtn
          bg={'green'}
          title={'Pay & Order'}
          color={'#ffffff'}
          onClick={() => {
            var options = {
              description: 'Credits towards consultation',
              image: 'https://i.imgur.com/3g7nmJC.png',
              currency: 'USD',
              key: 'rzp_test_vrOLL1g0B5ODiS', // Your api key
              amount: getTotal() * 1000,
              name: 'foo',
              prefill: {
                email: 'void@razorpay.com',
                contact: '9191919191',
                name: 'Razorpay Software',
              },
              theme: {color: '#FF9A0C'},
            };

            RazorpayCheckout.open(options)
              .then(data => {
                // handle success
                Alert.alert(`Success: ${data.razorpay_payment_id}`);
              })
              .catch(error => {
                // handle failure
                Alert.alert(`Error: ${error.code} | ${error.description}`);
              });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  items: {
    fontSize: fontScale(18),
    fontWeight: '700',
    color: 'black',
    margin: widthScale(15),
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightScale(10),
  },
  Qty: {
    fontSize: fontScale(16),
    marginLeft: widthScale(10),
  },
  SeparatorView: {
    height: heightScale(10),
    width: '100%',
  },
  searchView: {
    width: '90%',
    height: heightScale(45),
    borderRadius: widthScale(20),
    borderWidth: widthScale(0.5),
    alignItems: 'center',
    marginTop: heightScale(20),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    width: widthScale(18),
    height: heightScale(18),
    resizeMode: 'center',
    marginLeft: widthScale(10),
  },
  searchItem: {
    width: '80%',
  },
  productItem: {
    width: width,
    height: heightScale(120),
    marginTop: heightScale(10),
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    width: widthScale(100),
    height: heightScale(100),
    resizeMode: 'contain',
    margin: widthScale(5),
  },
  innerView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: fontScale(15),
    fontWeight: '600',
    marginLeft: widthScale(5),
    color: 'black',
  },
  desc: {
    marginTop: heightScale(5),
    marginLeft: widthScale(5),
    color: 'black',
  },
  price: {
    fontSize: fontScale(16),
    marginTop: heightScale(5),
    fontWeight: '800',
    color: 'green',
  },
  btn: {
    padding: widthScale(10),
    borderWidth: widthScale(0.5),
    borderRadius: widthScale(5),
    width: widthScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: widthScale(10),
  },
  decrement: {
    fontSize: fontScale(16),
    fontWeight: '600',
    color: 'black',
  },
  noItem: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalView: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: widthScale(0.3),
    borderBottomColor: '#B7B7B7',
  },
  total: {
    fontSize: fontScale(14),
    fontWeight: '700',
    color: 'black',
    padding: widthScale(10),
  },
  totalAmount: {
    fontSize: fontScale(14),
    fontWeight: '700',
    color: 'black',
    paddingRight: widthScale(15),
  },
  paymentMethod: {
    flexDirection: 'row',
    width: '90%',
    marginTop: heightScale(15),
  },
  img: {
    width: widthScale(24),
    height: heightScale(24),
    marginLeft: widthScale(15),
  },
  radio_item: {
    marginLeft: widthScale(10),
    fontSize: fontScale(14),
    fontWeight: '500',
  },
  addressView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingRight: widthScale(10),
  },
});
