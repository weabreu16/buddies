import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../elements/Background';
import Logo from '../elements/Logo';
import Header from '../elements/Header';
import Button from '../elements/Button';
import TextInput from '../elements/TextInput';
import BackButton from '../elements/BackButton';
import { theme } from '../../core/theme';
import { passwordValidator } from '../../helpers/passwordValidator';
import { nameValidator } from '../../helpers/nameValidator';
import UserService from '../../services/user.service';

export default function RegisterScreen({ navigation }) {
  const [user, setUser] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onSignUpPressed = async () => {
    const userError = nameValidator(user.value);
    const passwordError = passwordValidator(password.value);

    if (userError || passwordError) {
      setUser({ ...user, error: userError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    await UserService.signup( user.value, password.value );

    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="User"
        returnKeyType="next"
        value={user.value}
        onChangeText={(text) => setUser({ value: text, error: '' })}
        error={!!user.error}
        errorText={user.error}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={() => onSignUpPressed()}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
