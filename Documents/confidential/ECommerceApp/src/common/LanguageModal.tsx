import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {fontScale, widthScale, heightScale} from '../custom/StandardMargin';
const {height, width} = Dimensions.get('window');
import RadioGroup from 'react-native-radio-buttons-group';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTranslation} from 'react-i18next';

const LanguageModal = ({
  modalVisible,
  setLangModalVisible,
  onSelectLang,
  onClose,
}) => {
  const [selectedLang, setSelectedLang] = useState(0);
  const {i18n} = useTranslation();
  const [languages, setLangauges] = useState([
    {name: 'English', selected: true, label: 'en'},
    {name: 'हिन्दी', selected: false, label: 'hi'},
    {name: 'বাংলা', selected: false, label: 'ben'},
  ]);

  const [currentLanguage, setLanguage] = useState('en');

  const changeLanguage = value => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  const onSelect = index => {
    const temp = languages;
    temp.map((item, ind) => {
      if (index == ind) {
        if (item.selected == true) {
          item.selected = false;
        } else {
          item.selected = true;
          setSelectedLang(index);
        }
      } else {
        item.selected = false;
      }
    });
    let temp2 = [];
    temp.map(item => {
      temp2.push(item);
    });
    setLangauges(temp2);
  };
  // const [radioButtons, setRadioButtons] = useState([
  //   {
  //     id: '1', // acts as primary key, should be unique and non-empty string
  //     label: 'English',
  //     value: 'English',
  //   },
  //   {
  //     id: '2',
  //     label: '   Hindi',
  //     value: 'Hindi',
  //   },
  //   {
  //     id: '3',
  //     label: 'Bengali',
  //     value: 'Bengali',
  //   },
  // ]);
  // const onPressRadioButton = radioButtonsArray => {
  //   setRadioButtons(radioButtonsArray);
  //   const selected = radioButtonsArray.find(e => e.selected === true);
  //   console.log('current:- ', selected.label);
  //   setSelectedLang(selected);
  //   i18n.changeLanguage
  //   // radioButtonsArray.forEach(async element => {
  //   //   if (element.selected === true) {
  //   //     console.log(element.value);
  //   //     await AsyncStorage.setItem('LANG', element.value);
  //   //   }
  //   // });
  // };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setLangModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{width: '100%'}}>
            <FlatList
              data={languages}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.languageItem,
                      {borderColor: item.selected == true ? 'blue' : 'black'},
                    ]}
                    onPress={() => {
                      onSelect(index);
                      changeLanguage(item.label);
                    }}>
                    {item.selected === true ? (
                      <Image
                        source={require('../Images/selected.png')}
                        style={[styles.icon_image, {tintColor: 'blue'}]}
                      />
                    ) : (
                      <Image
                        source={require('../Images/non_selected.png')}
                        style={styles.icon_image}
                      />
                    )}

                    <Text
                      style={{
                        marginLeft: widthScale(20),
                        fontSize: fontScale(18),
                        color: item.selected == true ? 'blue' : 'black',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          {/* <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btn1}
              onPress={() => {
                setLangModalVisible(false);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn2}
              onPress={() => {
                setLangModalVisible(false);
                onSelectLang(selectedLang);
              }}>
              <Text style={{color: '#fff'}}>Apply</Text>
            </TouchableOpacity>
          </View> */}
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

export default LanguageModal;
const styles = StyleSheet.create({
  // modalView: {
  //   width: width,
  //   height: height,
  //   position: 'absolute',
  //   top: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  mainView: {
    backgroundColor: 'white',
    borderRadius: widthScale(10),
    width: '90%',
  },
  btn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    marginBottom: heightScale(10),
  },
  text: {
    color: 'white',
    fontSize: fontScale(16),
    fontWeight: '400',
  },
  clearBtn: {
    resizeMode: 'center',
    width: widthScale(25),
    height: heightScale(25),
  },
  icon: {
    position: 'absolute',
    top: heightScale(10),
    right: widthScale(8),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScale(20),
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: widthScale(20),
    width: width - 20,
    // height: height / 2,
    backgroundColor: 'white',
    borderRadius: widthScale(20),
    padding: widthScale(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: widthScale(0),
      height: heightScale(2),
    },
    shadowOpacity: widthScale(0.25),
    shadowRadius: widthScale(4),
    elevation: widthScale(5),
  },
  title: {
    fontSize: fontScale(18),
    fontWeight: '600',
  },
  languageItem: {
    width: '100%',
    height: heightScale(50),
    borderRadius: widthScale(10),
    borderWidth: widthScale(0.5),
    marginTop: heightScale(10),
    paddingLeft: widthScale(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_image: {
    width: widthScale(24),
    height: heightScale(24),
  },
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: heightScale(20),
    marginBottom: heightScale(20),
  },
  btn1: {
    width: '40%',
    height: heightScale(50),
    borderWidth: widthScale(0.5),
    borderRadius: widthScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn2: {
    width: '40%',
    height: heightScale(50),
    borderWidth: widthScale(0.5),
    borderRadius: widthScale(10),
    backgroundColor: '#4B68E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
