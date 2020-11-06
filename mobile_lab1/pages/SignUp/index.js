import React, { useState } from 'react'
import { Text, View, StyleSheet, Button, TextInput } from 'react-native'
import firebase from 'firebase'


const SignUp = ({ navigation }) => {
  const [data, setData] = useState({
    email: '',
    phone: 0,
    password: '',
    isValidEmail: false,
    isValidPassword: false,
    isValidPhone: false,
    name: '',
  })

  const onPressed = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() => {navigation.navigate("Home", { name : data.name})})
      .catch((error)=> {
        console.log(error);
      })
  }
  
  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (reg.test(text) === true) {
      setData({ ...data, email: text, isValidEmail: true })
    } else {
      setData({ ...data, email: text, isValidEmail: false })
    }
  }

  const checkNum = (num) => {
    if (num.trim().length === 10) {
      setData({ ...data, phone: num, isValidPhone: true })
    } else {
      setData({ ...data, phone: num, isValidPhone: false })
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

  return (<View style={styles.wrapper}>
        <View style={styles.container}>
              <Text style={styles.titleWrapper}>Sign up</Text>
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
                <Text style={styles.textWrapper}>Name:</Text>
                <TextInput
                  type="text"
                  id="name"
                  placeholder="Name"
                  onChangeText={(name) => {
                    setData({ name: name })
                  }}
                />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.textWrapper}>Phone:</Text>
                <View style={styles.contain}>
                  <TextInput
                    type="text"
                    id="phone"
                    placeholder="Phone"
                    onChangeText={(num) => {
                      checkNum(num)
                    }}
                  />
                  {data.isValidPhone ? null : (
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
              <View style={styles.buttonWrapper}>
                <Button
                  title="Sign Up"
                  color="#E9B735"
                  onPress={onPressed}
                ></Button>
              </View>
              <View style={styles.lastRow}>
                <Text style={styles.qa}>Not with us yet?</Text>
                <Text
                  style={styles.link}
                  onPress={() => {
                  navigation.navigate("SignIn")
                }}
              >
              Sign In
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
    height: 450,
    justifyContent: 'center',
    alignContent: 'center',
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

export default SignUp
