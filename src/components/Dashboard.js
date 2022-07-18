import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import React from 'react';
import { Button, Header, Icon, Image } from '@rneui/themed';
import Contact from './elements/Contact';
import { removeData } from '../services/store.manager';
import { getContacts } from '../services/contact.service';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/*let contacts = [ {_id: 1, name: 'Nel', lastName: 'Perez', phone: '8091134785', mobile: '8294651796', email: 'test@example.com'},
{_id: 2, name: 'Nel', lastName: 'Perez', phone: '8091134785', mobile: '8294651796', email: 'test@example.com'}
]*/

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    }
  }

  async componentDidMount() {
    let contacts = await getContacts();

    this.setState({
      ...this.state,
      contacts: contacts
    })
  }

  async componentDidUpdate() {
    let contacts = await getContacts();

    this.setState({
      ...this.state,
      contacts: contacts
    })
  }

  contactComparison( contactOne, contactTwo ) {
    const oneName = contactOne.name.toUpperCase();
    const twoName = contactTwo.name.toUpperCase();

    if ( oneName > twoName ) return 1;
    
    return twoName > oneName ? -1 : 0;
  }

  selectContact(contact) {
    this.props.navigation.navigate('ContactsForm', { contact: contact });
  }

  async logout() {
    await removeData('@access_token');

    this.props.navigation.reset({
      index: 0, 
      routes: [{ name: 'StartScreen' }],
    });
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
                source={ require('../../assets/user.png') }
                containerStyle={{ width: '25px', height: '25px', position: 'absolute', left: '20px', bottom: '8px' }}
            />
        </View>

        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1
            }}
            keyboardShouldPersistTaps='handled'
          >
    
            <View style={styles.tasksWrapper}>
              <Text style={styles.sectionTitle}>Contacts</Text>
              <View style={styles.items}>
                {
                  this.state.contacts.sort((a, b) => this.contactComparison(a, b))
                  .map((item, index) => {
                    return (
                      <TouchableOpacity key={index}  onPress={() => this.selectContact(item)}>
                        {<Contact contacts={item} /> }
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </View>
          </ScrollView>

          <Image source={ require('../../assets/logout.png') }
            containerStyle={ styles.logoutButtonContainer }
            onPress={() => this.logout()}
          />

          <Icon type='material' color='#fff' size={33}
            name='add'
            containerStyle={ styles.floatingButtonContainer }
            onPress={ () => this.props.navigation.navigate('ContactsForm') }
          />
        </View>
      </SafeAreaProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
    
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    
    borderWidth: 1,
  },
  image: {
    width: 25,
    height: 24,
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

  logoutButtonContainer: {
    width: 19,
    height: 19,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },

  logo: {
    width: 150,
    height: 200,
    alignSelf: 'flex-start',
    marginTop: -180,
    marginLeft:-9,
  },

});

export default Dashboard;