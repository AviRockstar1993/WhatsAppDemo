import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, Image} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [isVisible, setiSVissible] = useState(true);
  useEffect(() => {
    setTimeout(function () {
      setiSVissible(false);
      navigation.navigate('DetailsScreen');
    }, 5000);
  });
  return (
    <View style={styles.screenContainer}>
      <Image
        style={styles.imageStyle}
        source={require('../assets/splash.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
  },
  buttonStyle: {
    height: 54,
    width: '80%',
    marginTop: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2EE59D',
    shadowRadius: 5,
    shadowOpacity: 0.7,
    shadowColor: 'rgba(46, 229, 157, 0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  buttonTextStyle: {
    color: '#fdfdfd',
    fontWeight: '700',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
  },
});

export default HomeScreen;
