import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Keyboard,
} from 'react-native';
import Home from './Home';
import Search from '../searchPage/Search';
import Favourite from '../favourite/Favourite';
import Notification from '../notification/Notification';
import Profile from '../profile/Profile';
import {widthScale, heightScale} from '../../../custom/StandardMargin';

function HomeScreen() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [iskeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <StatusBar hidden={true} /> */}
      <View style={styles.container}>
        {/* <Header
        leftIcon={require('../Images/menu.png')}
        rightIcon={require('../Images/cart.png')}
        title={'Grocery App'}
        onClickLeftIcon={() => navigation.openDrawer()}
      /> */}
        {selectedTab === 0 ? (
          <Home />
        ) : selectedTab === 1 ? (
          <Search />
        ) : selectedTab === 2 ? (
          <Favourite />
        ) : selectedTab === 3 ? (
          <Notification />
        ) : selectedTab === 4 ? (
          <Profile />
        ) : null}

        {!iskeyboardVisible && (
          <View style={styles.bottomView}>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => {
                setSelectedTab(0);
              }}>
              <Image
                source={
                  selectedTab === 0
                    ? require('../../../Images/home_fill.png')
                    : require('../../../Images/home.png')
                }
                style={styles.bottomTabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => {
                setSelectedTab(1);
              }}>
              <Image
                source={
                  selectedTab === 1
                    ? require('../../../Images/search.png')
                    : require('../../../Images/search.png')
                }
                style={styles.bottomTabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => {
                setSelectedTab(2);
              }}>
              <Image
                source={
                  selectedTab === 2
                    ? require('../../../Images/heart_fill.png')
                    : require('../../../Images/heart.png')
                }
                style={styles.bottomTabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => {
                setSelectedTab(3);
              }}>
              <Image
                source={
                  selectedTab === 3
                    ? require('../../../Images/bell.png')
                    : require('../../../Images/bell_fill.png')
                }
                style={styles.bottomTabIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomTab}
              onPress={() => {
                setSelectedTab(4);
              }}>
              <Image
                source={
                  selectedTab === 4
                    ? require('../../../Images/profile.png')
                    : require('../../../Images/profile_fill.png')
                }
                style={styles.bottomTabIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
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
    resizeMode: 'contain',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: heightScale(100),
    marginTop: heightScale(10),
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  itemImage: {
    width: widthScale(100),
    height: heightScale(100),
  },
});
