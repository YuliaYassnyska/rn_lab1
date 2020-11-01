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
    padding: '1rem',
    width: '30rem',
    height: '30rem',
  },
  titleWrapper: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: '2rem',
    justifyContent: 'center',
  },
  buttonWrapper: {
    display: 'flex',
    border: '1px solid #1A1E3D',
    marginTop: '1rem',
  },
})

export default Home
