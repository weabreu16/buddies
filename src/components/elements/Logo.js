import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function Logo() {
  return <Image source={require('../../../assets/logo01.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 100,
    marginBottom: 8,
  },
})
