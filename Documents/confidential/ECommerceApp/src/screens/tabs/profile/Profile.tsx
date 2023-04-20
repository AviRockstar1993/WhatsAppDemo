import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import LanguageModal from '../../../common/LanguageModal';
import {
  widthScale,
  heightScale,
  fontScale,
} from '../../../custom/StandardMargin';
import Header from '../../../common/Header';
import {useTranslation} from 'react-i18next';
import '../../../../language/i18n';
import {useNavigation} from '@react-navigation/native';

const Profile = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [languageSelection, setLanguageSelection] = useState(0);
  const {t, i18n} = useTranslation();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title={t('profile')} />
      <Image
        source={require('../../../Images/user_icon.png')}
        style={styles.user}
      />
      <Text style={styles.title}>
        {/* {languageSelection == 0
        ? English.translation.name
        : languageSelection == 1
        ? Hindi.translation.name
        : languageSelection == 2
        ? Bengali.translation.name
        : null} */}
        {t('name')}
      </Text>
      <Text
        style={[
          styles.title,
          {fontSize: fontScale(15), marginTop: heightScale(0)},
        ]}>
        {t('email')}
      </Text>
      <TouchableOpacity style={[styles.tab, {marginTop: heightScale(20)}]}>
        <Text style={styles.txt}>{t('edit')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: heightScale(10)}]}
        onPress={() => {
          navigation.navigate('Checkout');
        }}>
        <Text style={styles.txt}>{t('Orders')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: heightScale(10)}]}>
        <Text style={styles.txt}>{t('Address')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: heightScale(10)}]}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.txt}>{t('language')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: heightScale(10)}]}>
        <Text style={styles.txt}>{t('methods')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.tab, {marginTop: heightScale(10)}]}>
        <Text style={styles.txt}>{t('logout')}</Text>
      </TouchableOpacity>

      <LanguageModal
        modalVisible={modalVisible}
        setLangModalVisible={setModalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
        onSelectLang={x => {
          setLanguageSelection(x);
          //saveSelectedLang(x);
        }}
      />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    fontSize: fontScale(17),
    fontWeight: '600',
    marginTop: heightScale(10),
    alignSelf: 'center',
  },
  input: {
    width: '90%',
    height: heightScale(50),
    borderRadius: widthScale(5),
    borderWidth: widthScale(0.5),
    paddingLeft: widthScale(15),
    marginLeft: widthScale(20),
    marginTop: heightScale(20),
  },
  loginText: {
    color: 'black',
    fontSize: fontScale(16),
    fontWeight: '500',
    alignSelf: 'center',
    marginTop: heightScale(15),
    textDecorationLine: 'underline',
  },
  user: {
    resizeMode: 'center',
    alignSelf: 'center',
    width: widthScale(100),
    height: heightScale(100),
    marginTop: heightScale(40),
  },
  tab: {
    width: '90%',
    height: heightScale(50),
    borderBottomWidth: widthScale(0.5),
    alignSelf: 'center',
    borderBottomColor: 'black',
    paddingLeft: widthScale(20),
    justifyContent: 'center',
  },
  txt: {
    color: 'black',
  },
});
