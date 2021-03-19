// SignUp.js
//Login page eklenecek ilerde 
import React from 'react'
import {
  View,
  Button,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';


export default class SignUp extends React.Component {

  state = {
   email: '', password: '' ,
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  signUp = async ()=> {
    const { email, password } = this.state
    const {navigate} = this.props.navigation;
    
    fetch("http://10.0.2.2:3000/signup",{
       method:"POST",
       headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "email":email,
        "password":password
      })
    })
    .then(res=>res.json())
     .then(async (data)=>{
            try {
             await AsyncStorage.setItem('token',data.token)//token eklenecek  Login ' e geçmeden
             navigate('Login');//eklenecek Login Page gelince        
            } catch (e) { 
              console.log("err hai",e)
            }
    })
  }

  render() {

    return (
      
           <TextInput
               style={styles.inputs}
            placeholder='Username'
            autoCapitalize="none"
            maxLength={10}
            value={this.state.email}
            onChangeText={val => this.onChangeText('email', val)}
          />

        <TextInput
          style={styles.inputs}
          placeholder='Password'    
          secureTextEntry={true}
          maxLength={10}
          svalue={this.state.password}
          autoCapitalize="none"
          onChangeText={val => this.onChangeText('password', val)}
        />
            
            <TouchableOpacity onPress={this.signUp}>
                 Text>Signup</Text>
             </TouchableOpacity>
    )
  }
}



