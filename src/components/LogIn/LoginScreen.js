import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
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

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })

  const onLoginPressed = async () => {
    const userError = nameValidator(user.value);
    const passwordError = passwordValidator(password.value);

    if (userError || passwordError) {
      setUser({ ...user, error: userError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    await UserService.login( user.value, password.value );

    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="User"
        returnKeyType="next"
        value={user.value}
        onChangeText={(text) => setUser({ value: text, error: '' })}
        error={!!user.error}
        errorText={user.error}
        autoCapitalize="none"
        autoCompleteType="username"
        textContentType="username"
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
      <Button mode="contained" onPress={() => onLoginPressed()}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})
