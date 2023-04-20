import React, {useTransition} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {fontScale, widthScale, heightScale} from '../custom/StandardMargin';
import CustomBtn from '../custom/CustomBtn';
const {height, width} = Dimensions.get('window');
import {useTranslation} from 'react-i18next';
import '../../language/i18n';

const AskForLoginModel = ({
  modalVisible,
  onClickLogin,
  onClickSignIn,
  onClose,
}) => {
  const {t} = useTranslation();
  return (
    <Modal visible={modalVisible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <TouchableOpacity
            style={[styles.btn, {marginTop: widthScale(30)}]}
            onPress={() => {
              onClickLogin();
            }}>
            <Text style={styles.text}>{t('Login')} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.btn,
              {marginTop: heightScale(15), marginBottom: heightScale(30)},
            ]}
            onPress={() => {
              onClickSignIn();
            }}>
            <Text style={styles.text}>{t('Create account')} </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => {
              onClose();
            }}>
            <Image
              source={require('../Images/cross.png')}
              style={styles.clearBtn}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AskForLoginModel;
const styles = StyleSheet.create({
  modalView: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainView: {
    backgroundColor: 'white',
    borderRadius: 10,

    width: '90%',
  },
  btn: {
    width: '86%',
    height: heightScale(50),
    alignSelf: 'center',
    backgroundColor: '#FF9A0C',
    borderRadius: widthScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
  clearBtn: {
    resizeMode: 'center',
    width: widthScale(25),
    height: heightScale(25),
  },
  icon: {
    position: 'absolute',
    top: 2,
    right: 5,
  },
});
