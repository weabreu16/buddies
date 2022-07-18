import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

function Contact(props) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <FontAwesome name="user" size={24} style={styles.square} color="white" />
        <Text style={styles.itemText}>{props.contacts.name}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ab2900',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  square: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontSize:20,
    fontWeight:'bold',
    color:'#fff',

  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  
});

export default Contact;