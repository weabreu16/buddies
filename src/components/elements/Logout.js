import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'

export default function Logout({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.roundButton,
        mode === 'contained',
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    position: 'absolute',
    color:"black",
    bottom: 15,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 35,
    color: "white",
  },
  roundButton: {
    alignSelf: 'flex-start',
    marginLeft:8,
    bottom: -55,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#ab2900',
  }
})