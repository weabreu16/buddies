import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Image, Input, Text } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import imageSample from '../../assets/1.jpg';
import logoutImage from '../../assets/logout.png';
import * as ImagePicker from 'expo-image-picker';
import { addContact, updateContact, removeContact } from '../services/contact.service';

class ContactsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {
                name: '',
                lastName: '',
                nickname: '',
                phone: '',
                mobile: '',
                email: '',
                image: '',
            },
            editMode: false
        }
    }

    componentDidMount() {
        if ( this.props.route.params && this.props.route.params.contact ) {
            this.setState({
                ...this.state,
                contact: {
                    ...this.state.contact,
                    ...this.props.route.params.contact
                }
            });
        }

        if ( !this.props.route.params || this.props.editMode ) {
            this.setState({
                ...this.state,
                editMode: true
            });
        }
    }

    applyInputChanges( name, value ) {
        this.setState({
            ...this.state,
            contact: {
                ...this.state.contact,
                [name]: value
            }
        });
    }

    validateContact() {
        if ( !this.state.contact.name ) return false;

        if ( !this.state.contact.phone && !this.state.contact.mobile ) return false;

        return true;
    }

    toggleEditMode() {
        this.setState({
            ...this.state,
            editMode: !this.state.editMode
        });
    }

    async pressedFloatingButton() {
        if ( !this.state.contact._id ) {
            if ( !this.validateContact() ) return;

            await addContact( this.state.contact );
            this.props.navigation.navigate('Dashboard');
            return;
        }

        if ( this.state.editMode === false ) {
            this.toggleEditMode();
            return;
        }

        if ( !this.validateContact() ) return;

        await updateContact( this.state.contact );

        this.toggleEditMode();
    }

    async deleteContact() {
        await removeContact( this.state.contact._id );

        this.props.navigation.navigate('Dashboard');
    }

    async pickImage() {
        if ( !this.state.editMode ) return;

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
    
        if ( !result.cancelled ) {
            this.setState({
                ...this.state,
                contact: {
                    ...this.state.contact,
                    image: result.base64
                }
            });
        }
    }

    render() {
        return (
            <SafeAreaProvider>
                <Header containerStyle={{ backgroundColor: '#F8F8F8' }}
                    leftComponent={
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: '17px' }}>Contacts</Text>
                        </View>
                    }
                    rightComponent={
                        <Image 
                            source={ require('../../assets/logo01.png') }
                            containerStyle={{ width: '100%', height: '100%' }}
                        />
                    }
                />
                <View style={{ padding: 0, backgroundColor: '#FFA588', height: '45px' }}>
                    <Image 
                        source={ !this.state.contact._id
                            ? require('../../assets/add-user.png') 
                            : require('../../assets/edit-user.png') }
                        containerStyle={{ width: '25px', height: '25px', position: 'absolute', left: '20px', bottom: '8px' }}
                    />
                    <Text style={{position: 'absolute', left: '50px', bottom: '10px', fontSize: '17px'}}>
                        { !this.state.contact._id ? 'Add Contact' : 'Edit Contact' }
                    </Text>
                </View>

                <View style={ styles.topFormContainer }>
                    <View style={ styles.flexContainer }>
                        <View style={ styles.imageContainer }>
                            <Image resizeMode='contain'
                                source={ !this.state.contact.image ? imageSample 
                                    : {uri: `data:image/png;base64,${this.state.contact.image}`}
                                }
                                style={ styles.image }
                                onPress={ () => this.pickImage() }
                            />
                        </View>

                        <View>
                            <Input label='Name' labelStyle={ styles.label }
                                style={ styles.input } 
                                inputContainerStyle={ styles.namesInputContainer }
                                value={ this.state.contact.name }
                                onChangeText={value => this.applyInputChanges( 'name', value )}
                                disabled={ !this.state.editMode }
                                disabledInputStyle={{ opacity: 1 }}
                            />
                            <Input label='Lastname' labelStyle={ styles.label }
                                style={ styles.input } 
                                inputContainerStyle={ styles.namesInputContainer }
                                value={ this.state.contact.lastName }
                                onChangeText={value => this.applyInputChanges( 'lastName', value )}
                                disabled={ !this.state.editMode }
                                disabledInputStyle={{ opacity: 1 }}
                            />
                            <Input label='Nickname' labelStyle={ styles.label }
                                style={ styles.input } 
                                inputContainerStyle={ styles.namesInputContainer }
                                value={ this.state.contact.nickname }
                                onChangeText={value => this.applyInputChanges( 'nickname', value )}
                                disabled={ !this.state.editMode }
                                disabledInputStyle={{ opacity: 1 }}
                            />
                        </View>
                    </View>
                </View>

                <View style={ styles.flexContainer }>
                    <View style={{ paddingLeft: '20px' }}>
                        <Icon name='phone' type='material' color='#000' size={17}
                            containerStyle={ styles.iconContainer }
                        />
                    </View>
                    <View style={{ width: '87.5%' }}>
                        <Input label='Mobile Number' labelStyle={ styles.label }
                            style={ styles.input } 
                            inputContainerStyle={ styles.inputContainer }
                            value={ this.state.contact.mobile }
                            onChangeText={value => this.applyInputChanges( 'mobile', value )}
                            disabled={ !this.state.editMode }
                            disabledInputStyle={{ opacity: 1 }}
                        />
                    </View>
                </View>

                <View style={ styles.flexContainer }>
                    <View style={{ paddingLeft: '20px' }}>
                        <Icon name='phone-in-talk' type='material' color='#000' size={17}
                            containerStyle={ styles.iconContainer }
                        />
                    </View>
                    <View style={{ width: '87.5%' }}>
                        <Input label='Phone Number' labelStyle={ styles.label }
                            style={ styles.input } 
                            inputContainerStyle={ styles.inputContainer }
                            value={ this.state.contact.phone }
                            onChangeText={value => this.applyInputChanges( 'phone', value )}
                            disabled={ !this.state.editMode }
                            disabledInputStyle={{ opacity: 1 }}
                        />
                    </View>
                </View>

                <View style={ styles.flexContainer }>
                    <View style={{ paddingLeft: '20px' }}>
                        <Icon name='email' type='material' color='#000' size={17}
                            containerStyle={ styles.iconContainer }
                        />
                    </View>
                    <View style={{ width: '87.5%' }}>
                        <Input label='E-mail Address' labelStyle={ styles.label }
                            style={ styles.input } 
                            inputContainerStyle={ styles.inputContainer }
                            value={ this.state.contact.email }
                            onChangeText={value => this.applyInputChanges( 'email', value )}
                            disabled={ !this.state.editMode }
                            disabledInputStyle={{ opacity: 1 }}
                        />
                    </View>
                </View>

                {this.state.contact._id && <Icon type='material' color='#fff' size={23}
                    name='delete'
                    containerStyle={ styles.floatingDeleteContainer }
                    onPress={ () => this.deleteContact() }
                />}

                <Icon type='material' color='#fff' size={33}
                    name={ this.state.contact._id && !this.state.editMode ? 'edit' : 'save' }
                    containerStyle={ styles.floatingButtonContainer }
                    onPress={ () => this.pressedFloatingButton() }
                />

                <Image source={logoutImage}
                    containerStyle={ styles.logoutButtonContainer }
                    onPress={() => this.props.navigation.navigate('Dashboard')}
                />
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    topFormContainer: {
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 14,
        marginLeft: 6,
        marginRight: 6,
    },

    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    imageContainer: {
        height: 110,
        width: 110,
        borderRadius: '100%',
        backgroundColor: '#ab2900',
        borderColor: '#ab2900',
        borderWidth: 4,
        borderStyle: 'solid',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        borderRadius: '100%',
        height: 100,
        width: 100,
    },

    namesInputContainer: {
        borderColor: '#ab2900',
        borderBottomWidth: 2,
        width: '100%'
    },

    inputContainer: {
        borderColor: '#ab2900',
        borderBottomWidth: 2,
        width: '92.5%'
    },

    label: {
        fontSize: '12px'
    },

    input: {
        minHeight: '15px',
        width: '190px',
        fontSize: '15px'
    },

    iconContainer: {
        backgroundColor: '#FFA588',
        borderRadius: '100%',
        height: '29px',
        width: '29px',
        justifyContent: 'center',
        alignItems: 'center',
    },

    floatingButtonContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#ab2900',
        position: 'absolute',
        bottom: 10,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    floatingDeleteContainer: {
        width: 45,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#ab2900',
        position: 'absolute',
        bottom: 85,
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoutButtonContainer: {
        width: 19,
        height: 19,
        position: 'absolute',
        bottom: 10,
        left: 10,
    }
});

export default ContactsForm;