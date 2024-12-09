import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case 'home':
      imageSource = require('../assets/panel/home.png');
      iconStyle.push(styles.active);
      break;
    case 'archive':
      imageSource = require('../assets/panel/archive.png');
      iconStyle.push(styles.active);
      break;
    case 'tastes':
      imageSource = require('../assets/panel/tastes.png');
      iconStyle.push(styles.active);
      break;
    case 'mozart':
      imageSource = require('../assets/panel/mozart.png');
      iconStyle.push(styles.active);
      break;
    case 'settings':
      imageSource = require('../assets/panel/settings.png');
      iconStyle.push(styles.active);
      break;
    case 'close':
      imageSource = require('../assets/common/close.png');
      iconStyle.push(styles.color);
      break;
    case 'music':
      imageSource = require('../assets/common/music.png');
      iconStyle.push(styles.light);
      break;
    case 'vibration':
      imageSource = require('../assets/common/vibration.png');
      iconStyle.push(styles.light);
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff',
  },
  color: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#214f1b',
  },
  light: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#19fa02',
  },
  contain: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }
});

export default Icons;
