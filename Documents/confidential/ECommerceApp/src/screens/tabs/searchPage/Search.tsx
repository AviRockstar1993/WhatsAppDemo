import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  fontScale,
  widthScale,
  heightScale,
} from '../../../custom/StandardMargin';
const {height, width} = Dimensions.get('window');
import Header from '../../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';

const Search = () => {
  const products = useSelector(state => state);
  const [search, setSearch] = useState('');
  const [oldData, setOldData] = useState(products.product.data);

  const [searchList, setSearchList] = useState(oldData);
  const navigation = useNavigation();
  console.log(JSON.stringify(products));
  const {t} = useTranslation();

  const filterData = txt => {
    let newData = oldData.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    //console.log(newData);
    setSearchList(newData);
  };

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
        title={t('Search Product')}
        rightIcon={require('../../../Images/cart.png')}
        onClickLeftIcon={() => navigation.openDrawer()}
        isCart={true}
      />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../../Images/search.png')}
            style={styles.icon}
          />
          <TextInput
            placeholder="Search Item here..."
            style={styles.searchItem}
            value={search}
            onChangeText={text => {
              setSearch(text);
              filterData(text);
            }}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            style={[
              styles.icon,
              {
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: widthScale(10),
              },
            ]}
            onPress={() => {
              setSearch('');
              filterData('');
            }}>
            <Image
              source={require('../../../Images/cross.png')}
              style={[
                styles.icon,
                {
                  width: widthScale(16),
                  height: heightScale(16),
                },
              ]}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{marginTop: heightScale(30)}}>
        <FlatList
          data={searchList}
          renderItem={renderItem}
          ItemSeparatorComponent={listViewItemSeparator}
        />
      </View>
    </View>
  );
};

export default Search;
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
