import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BalancePanel from './src/components/BalancePanel';
import { Button } from '@rneui/base';
import ContactsPanel from './src/components/ContactsPanel';
import Login from './src/components/Login';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsForm from './src/components/ContactsForm';
import Dashboard from './src/components/Dashboard';
import StartScreen from './src/components/LogIn/StartScreen';
import LoginScreen from './src/components/LogIn/LoginScreen';
import RegisterScreen from './src/components/LogIn/RegisterScreen';

const testData = [
  {id: 1, balance: 9000000, dateAdded: '20221231', isCredit: true, categoryId: 1},
  {id: 2, balance: 8000000, dateAdded: '20221230', isCredit: true, categoryId: 2},
  {id: 3, balance: 7000000, dateAdded: '20221229', isCredit: false, categoryId: 3}
];

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  return (
    <NavigationContainer theme={ theme } >
      <Stack.Navigator screenOptions={ { headerShown: false } }>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='ContactsForm' component={ContactsForm} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Contacts' component={ContactsPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*
<View style={styles.container}>
  <Text>Open up App.js to start working on your app!</Text>
  <ContactsPanel />
  <Button title="Hey!" />
  <StatusBar style="auto" />
</View>

<BalancePanel balanceData={ testData } ></BalancePanel>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
