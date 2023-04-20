import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import {useSelector} from 'react-redux';
import {fontScale, heightScale, widthScale} from '../custom/StandardMargin';
import {useNavigation} from '@react-navigation/native';
import {useTranslation, withTranslation} from 'react-i18next';

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onClickLeftIcon,
  onClickRightIcon,
  isCart,
}) => {
  const {t, i18n} = useTranslation();
  console.log(i18n.language);
  //console.log(t('name'));
  const cartItem = useSelector(state => state.cart);
  console.log(JSON.stringify(cartItem));
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}>
        <Image source={leftIcon} style={styles.lefticon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {!isCart && <View></View>}
      {isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <Image source={rightIcon} style={styles.lefticon} />

          <View style={styles.cartItem}>
            <Text style={styles.cartText}>{cartItem.data.length}</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 60,
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  btn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: 'white',
  },
  lefticon: {
    width: 30,
    height: 30,
  },
  title: {
    color: 'white',
    fontSize: 16,
  },
  cartItem: {
    width: widthScale(15),
    height: heightScale(15),
    borderRadius: widthScale(7.5),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cartText: {
    fontSize: fontScale(7),
    fontWeight: '500',
    color: 'black',
  },
});
