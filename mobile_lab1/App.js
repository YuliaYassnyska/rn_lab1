import React from 'react'
import { StyleSheet } from 'react-native'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import firebase from 'firebase';

const App = () => {

  var firebaseConfig = {
    apiKey: 'AIzaSyBmMQzZDPK8WoRFsXZwEikglgPh8fdbRfU',
    authDomain: 'moonlit-premise-268014.firebaseapp.com',
    databaseURL: 'https://project-483449585526.firebaseio.com',
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export default App
