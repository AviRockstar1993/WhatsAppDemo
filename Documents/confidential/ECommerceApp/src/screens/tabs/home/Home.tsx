import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  fontScale,
  widthScale,
  heightScale,
} from '../../../custom/StandardMargin';
import {useDispatch} from 'react-redux';
import {addProducts} from '../../../redux/slices/ProductSlice';
import Header from '../../../common/Header';
import axios from 'axios';
const {height, width} = Dimensions.get('window');
import '../../../../language/i18n';
import {useTranslation} from 'react-i18next';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {t} = useTranslation();

  const getProducts = async () => {
    await axios
      .get('https://fakestoreapi.com/products')
      .then(res => res.data)
      .then(json => {
        setProducts(json);
        json.map(item => {
          item.qty = 1;
        });
        dispatch(addProducts(json));
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        title={t('home')}
        rightIcon={require('../../../Images/cart.png')}
        onClickLeftIcon={() => navigation.openDrawer()}
        isCart={true}
      />
      <View style={{marginTop: heightScale(10)}}>
        <FlatList
          data={products}
          renderItem={renderItem}
          maxToRenderPerBatch={10}
          ItemSeparatorComponent={listViewItemSeparator}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: heightScale(32),
    paddingHorizontal: widthScale(24),
  },
  sectionTitle: {
    fontSize: fontScale(24),
    fontWeight: '600',
  },
  SeparatorView: {
    height: heightScale(10),
    width: '100%',
  },
  sectionDescription: {
    marginTop: heightScale(8),
    fontSize: fontScale(18),
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: heightScale(70),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: widthScale(24),
    height: heightScale(24),
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
