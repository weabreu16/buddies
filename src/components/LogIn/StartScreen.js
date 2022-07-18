import React from 'react';
import Background from '../elements/Background';
import Logo from '../elements/Logo';
import Button from '../elements/Button';

export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Logo />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        Sign Up
      </Button>
    </Background>
  )
}
