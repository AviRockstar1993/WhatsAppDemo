import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {widthScale, heightScale, fontScale} from './StandardMargin';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');

const CheckOutLayout = ({items, total}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.tab}>
        <Text style={styles.items}>{'Items: ' + `${items}`}</Text>
        <Text style={styles.total}>{'Total: $ ' + total}</Text>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={styles.checkout}
          onPress={() => {
            navigation.navigate('Checkout');
          }}>
          <Text style={styles.checkOutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CheckOutLayout;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: heightScale(70),
    width: width,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  total: {
    fontSize: fontScale(14),
    fontWeight: '700',
    color: '#000000',
  },

  checkout: {
    width: '80%',
    height: '50%',
    borderRadius: widthScale(10),
    backgroundColor: '#FF9A0C',
  },
  checkOutText: {
    color: 'white',
    fontSize: fontScale(16),
    alignSelf: 'center',
    paddingTop: heightScale(5),
    fontWeight: '500',
  },
  items: {
    fontSize: fontScale(14),
    fontWeight: '400',
  },
});
