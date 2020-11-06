import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, Input, TextInput } from 'react-native'
import firebase from 'firebase'


const SignIn = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    isValidEmail: false,
    isValidPassword: false,
    error: '',
    name: 'user',
  })

  const onButtonPress = () => {
    const { email, password } = data
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {navigation.navigate("Home", {name: data.name})})
      .catch(onLoginFail)
  }

  const onLoginFail = () => {
    setData({ error: 'Authentication Failed'})
  }

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === true) {
      setData({ ...data, email: text, isValidEmail: true })
    } else {
      setData({ ...data, email: text, isValidEmail: false })
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      })
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      })
    }
  }

  return (
  <View style={styles.wrapper}>
    <View style={styles.container}>
      <Text style={styles.titleWrapper}>Sign in</Text>
        <View style={styles.rowContainer}>
          <Text style={styles.textWrapper}>Email:</Text>
            <View style={styles.contain}>
              <TextInput
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChangeText={(text) => validate(text)}
              />
              {data.isValidEmail ? null : (
                <Text style={styles.errorText}>field is required</Text>
              )}
            </View>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.textWrapper}>Password:</Text>
              <View style={styles.contain}>
                <TextInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChangeText={(val) => handlePasswordChange(val)}
                />
                {data.isValidPassword ? null : (
                  <Text style={styles.errorText}>field is required</Text>
                )}
              </View>
            </View>
            <Text style={styles.errorText}>{data.error}</Text>
            <View style={styles.buttonWrapper}>
              <Button
                title="Sign In"
                color="#E9B735"
                onPress={onButtonPress}
              />
            </View>
            <View style={styles.lastRow}>
              <Text style={styles.qa}>Not with us yet?</Text>
              <Text
                style={styles.link}
                onPress={() => {
                  navigation.navigate('SignUp')
                }}
               >
                Sign Up
              </Text>
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
  textWrapper: {
    display: 'flex',
    fontSize: 19.2,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderColor: '#ffffff',
    padding: 16,
  },
  buttonWrapper: {
    display: 'flex',
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderColor: '#1A1E3D',
    marginTop: 16,
  },
  lastRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginLeft: 16,
    marginRight: 48,
  },
  qa: {
    fontSize: 14.4,
    color: '#1A1E3D',
  },
  link: {
    fontWeight: 'bold',
    color: '#6BB5C9',
  },
  errorText: {
    fontSize: 11.2,
    color: '#C7424F',
    fontWeight: 'bold',
    width: 128,
  },
  contain: {
    display: 'flex',
    flexDirection: 'column',
  },
})

export default SignIn
