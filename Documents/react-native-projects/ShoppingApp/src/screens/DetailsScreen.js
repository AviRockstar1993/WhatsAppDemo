import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const DetailsScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const getData = async () => {
    const apiUrl = `https://randomuser.me/api/?page=${currentPage}&results=10`;

    await axios.get(apiUrl).then(res => {
      setData([...data, ...res.data.results]);
      // const holdData = res;
      //storeToken(holdData);
      ///setUsers([...users, ...res.data.results]);
      setLoading(false);
    });
  };

  // const storeToken= async(allData)=> {
  //   try {
  //      await AsyncStorage.setItem("userToken",JSON.stringify(allData));

  //   } catch (error) {
  //     console.log("Something went wrong while storing user token!", error);
  //   }
  // }

  renderItem = ({item}) => {
    return (
      <View style={styles.itemRow}>
        <TouchableOpacity onPress={() => navigation.navigate('DrawerScreen')}>
          <Image source={{uri: item.picture.large}} style={styles.itemImage} />
        </TouchableOpacity>

        <Text style={styles.itemText}>{item.email}</Text>
        <Text style={styles.itemText}>{item.id.name}</Text>
      </View>
    );
  };

  renderFooter = () => {
    return isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  handlePageData = () => {
    setLoading(true);
    setCurrentPage(currentPage + 1);
    console.log('page', currentPage);
    setLoading(false);
  };

  return (
    <FlatList
      style={styles.Container}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={renderFooter}
      onEndReached={handlePageData}
    />
  );
};

const styles = StyleSheet.create({
  Container: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
});

export default DetailsScreen;
