import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Header } from '@rneui/themed';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import imageSample from '../../assets/1.jpg';
import Contact from './Contact';
import { getContacts } from '../services/contact.service';

class ContactsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contacts: []
        }
    }

    async componentDidMount() {
        try {
            let contacts = await getContacts();

            this.setState({
                ...this.state,
                contacts: contacts
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return(
            <SafeAreaProvider>
                <Header containerStyle={ styles.container }
                    centerComponent={ { text: 'CONTACTS', style: styles.heading } }
                />

                <FlatList data={ this.state.contacts }
                    keyExtractor={ item => item._id.toString() }
                    renderItem={({item, index}) => {
                        return <>
                            <Contact contact={item} />
                        </>
                    }}
                />
            </SafeAreaProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50
    },

    heading: {
        color: '#2f2f2f',
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#3f3f3f'
    },

    cardContainer: {
        borderWidth: '0',
        shadowOffset: '0',
        padding: '0',
        display: 'flex'
    },

    imageContainer: {
        display: 'flex',
        width: '80px',
        height: '80px',
        borderWidth: '1px',
        borderRadius: '100%',
        justifyContent: 'center',
        alignContent: 'center'
    },

    image: {
        aspectRatio: 1,
        width: '100%',
        flex: 1
    },

    divider: {
        width: '85%',
        margin: 20
    }
});

export default ContactsPanel;

/*
<Card containerStyle={ styles.cardContainer }>
    <View style={ styles.imageContainer }>
        { this.renderImage( item.image ) }
    </View>
    <View style={ { alignContent: 'center', justifyContent: 'center' } }>
        <Text h4>{ item.name }</Text>
    </View>
</Card>
*/