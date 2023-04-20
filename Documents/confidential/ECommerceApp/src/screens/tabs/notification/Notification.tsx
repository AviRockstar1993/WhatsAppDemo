import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Header from '../../../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';

const Notification = () => {
  //console.log('current language:-', i18n.language);
  //console.log(t('name'));
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../../../Images/menu.png')}
        title={'Notification'}
        onClickLeftIcon={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default Notification;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  txt: {
    color: 'black',
  },
});
