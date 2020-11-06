import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import firebase from 'firebase'


const Home = ({ navigation, route }) => {
  const { name } = route.params;

  const onPressed = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <View style={styles.wrapper}>
        <View style={styles.container}>
        <Text style={styles.titleWrapper}>Welcome, {name}!</Text>
          <View style={styles.buttonWrapper}>
            <Button title="Sign out" color="#E9B735" onPress={() => {onPressed()}} />
          </View>
        </View>
     </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ecf0f1',
    padding: 16,
    width: 400,
    height: 400,
  },
  titleWrapper: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 32,
    justifyContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderColor: '#1A1E3D',
    marginTop: 16,
  },
})

export default Home
