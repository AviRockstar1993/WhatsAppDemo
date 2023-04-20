import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import Header from '../../../common/Header';
const {height, width} = Dimensions.get('window');
import {
  fontScale,
  widthScale,
  heightScale,
} from '../../../custom/StandardMargin';
import {
  addItemToCart,
  reduceItemFromCart,
  removeItemFromCart,
} from '../../../redux/slices/CartSlice';
import CheckOutLayout from '../../../custom/CheckOutLayout';
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';

const CartPage = () => {
  const cartItem = useSelector(state => state.cart);
  console.log('fetch', cartItem.data);
  const {t} = useTranslation();

  const [cartList, setCartList] = useState([]);

  const navigation = useNavigation();
  const route = useRoute();
  const disPatch = useDispatch();

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

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../../Images/left_arrow.png')}
        title={t('Cart Items')}
        onClickLeftIcon={() => {
          onBack();
        }}
      />
      <View style={{marginTop: heightScale(10)}}>
        <FlatList
          data={cartList}
          renderItem={renderItem}
          ItemSeparatorComponent={listViewItemSeparator}
        />
      </View>
      {cartList.length < 1 && (
        <View style={styles.noItem}>
          <Text style={styles.name}>{t('noItems')}</Text>
        </View>
      )}

      {cartList.length > 0 && (
        <CheckOutLayout items={cartList.length} total={getTotal()} />
      )}
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
