import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../../../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  fontScale,
  widthScale,
  heightScale,
} from '../../../custom/StandardMargin';
import CustomBtn from '../../../custom/CustomBtn';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToWish} from '../../../redux/slices/WishListSlice';
import {addItemToCart} from '../../../redux/slices/CartSlice';
import AskForLoginModel from '../../../common/AskForLoginModel';
//import {auth} from '../../../../firebase';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';

const ProductDetail = () => {
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const route = useRoute();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const id = useSelector(state => state.login);

  const user_id = auth().currentUser?.uid;
  console.log('user_id:-', user_id);
  console.log('id:-', id);

  const checkUserStatus = () => {
    let isUserLoggedIn = false;
    //let status = '';
    if (user_id === undefined) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    return isUserLoggedIn;
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../../Images/left_arrow.png')}
        rightIcon={require('../../../Images/cart.png')}
        title={t('product_detail')}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
        <Image source={{uri: route.params.data.image}} style={styles.banner} />
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>{route.params.data.description}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.priceText}> {t('Price')} </Text>
          <Text style={styles.price}>{'$' + route.params.data.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={styles.decrement}>-</Text>
            </TouchableOpacity>
            <Text style={styles.Qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setQty(qty + 1);
              }}>
              <Text style={styles.decrement}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => {
            if (checkUserStatus() === true) {
              setSelectedTab(1);
              dispatch(addItemToWish(route.params.data));
            } else {
              setModalVisible(true);
            }
          }}>
          {selectedTab === 1 ? (
            <Image
              source={require('../../../Images/heart_fill.png')}
              style={styles.icon}
            />
          ) : (
            <Image
              source={require('../../../Images/heart.png')}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>

        <CustomBtn
          bg={'#FF9A0C'}
          title={t('Add to Cart')}
          color={'white'}
          onClick={() => {
            if (checkUserStatus() === true) {
              setSelectedTab(1);
              Alert.alert('Product added to cart');
              dispatch(
                addItemToCart({
                  category: route.params.data.category,
                  description: route.params.data.description,
                  id: route.params.data.id,
                  image: route.params.data.image,
                  price: route.params.data.price,
                  qty: qty,
                  rating: route.params.data.rating,
                  title: route.params.data.title,
                }),
              );
            } else {
              setModalVisible(true);
            }
          }}
        />
      </ScrollView>
      <AskForLoginModel
        modalVisible={modalVisible}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
        onClickSignIn={() => {
          setModalVisible(false);
          navigation.navigate('SignUp');
        }}
        onClose={() => {
          setModalVisible(false);
        }}
      />
    </View>
  );
};

export default ProductDetail;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  banner: {
    width: '100%',
    height: heightScale(200),
    resizeMode: 'center',
    marginTop: heightScale(10),
  },
  title: {
    fontSize: fontScale(20),
    fontWeight: '600',
    marginTop: heightScale(20),
    marginLeft: widthScale(15),
    color: 'black',
  },
  desc: {
    fontSize: fontScale(15),
    margin: widthScale(15),
  },
  price: {
    color: 'green',
    fontSize: fontScale(15),
    paddingTop: heightScale(15),
    fontWeight: '800',
  },
  priceText: {
    color: 'black',
    fontSize: fontScale(15),
    margin: widthScale(15),
    fontWeight: '800',
  },
  wishlistBtn: {
    position: 'absolute',
    right: widthScale(50),
    top: heightScale(100),
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthScale(20),
    width: widthScale(40),
    height: heightScale(40),
  },
  icon: {
    width: widthScale(25),
    height: heightScale(25),
    resizeMode: 'center',
  },
  qtyView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: widthScale(10),
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
  Qty: {
    fontSize: fontScale(16),
    marginLeft: widthScale(10),
  },
});
