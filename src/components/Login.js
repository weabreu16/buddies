import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Button, Icon, Input } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import UserService from '../services/user.service';

const testContacts = [
    { _id: 1, name: 'alexander', phone: '2313123', image: '', userId: 1 },
    { _id: 2, name: 'mone', phone: '123411323132', image: '', userId: 1 }
];

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    async login() {

        await UserService.login( this.state.username, this.state.password );

        this.props.navigation.navigate('Contacts');
    }

    render() {
        return (
            <SafeAreaProvider>
                <Input 
                    placeholder='username'
                    leftIcon={ <Icon name='perm_identity' size={24} color='black' /> }
                    onChangeText={value => this.setState({ username: value })}
                />

                <Input 
                    placeholder='password'
                    leftIcon={ <Icon name='lock' size={24} color='black' /> }
                    onChangeText={value => this.setState({ password: value })}
                    secureTextEntry
                />

                <Button 
                    title='LogIn' 
                    containerStyle={ styles.loginButton } 
                    onPress={ () => this.login() }
                />
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    loginButton: {
        borderRadius: '20px'
    }
});

export default Login;