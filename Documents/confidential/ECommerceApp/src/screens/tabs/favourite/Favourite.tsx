import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../common/Header';
const {height, width} = Dimensions.get('window');
import {
  fontScale,
  widthScale,
  heightScale,
} from '../../../custom/StandardMargin';

const Favourite = () => {
  const wishedItem = useSelector(state => state.wishlist);
  const [wishedList, setWishedList] = useState(wishedItem.data);
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          navigation.navigate('Product', {data: item});
        }}>
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
            <Text style={styles.price}>{'$ ' + item.price}</Text>
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
        leftIcon={require('../../../Images/menu.png')}
        title={'WishList Items'}
        rightIcon={require('../../../Images/cart.png')}
        onClickLeftIcon={() => navigation.openDrawer()}
      />
      <View style={{marginTop: heightScale(10)}}>
        <FlatList
          data={wishedList}
          renderItem={renderItem}
          ItemSeparatorComponent={listViewItemSeparator}
        />
      </View>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
