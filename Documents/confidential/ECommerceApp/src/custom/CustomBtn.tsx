import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {fontScale, heightScale, widthScale} from './StandardMargin';
const {height, width} = Dimensions.get('window');

const CustomBtn = ({bg, title, onClick, color, width}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.btn, {backgroundColor: bg}]}
        onPress={() => {
          onClick();
        }}>
        <Text
          style={{color: color, fontSize: fontScale(15), fontWeight: '500'}}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  btn: {
    width: width - 40,
    height: heightScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: heightScale(10),
    borderRadius: widthScale(10),
  },
});
