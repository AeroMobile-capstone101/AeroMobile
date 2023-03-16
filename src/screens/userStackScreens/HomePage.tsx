import React from 'react'
import { View, Text, Button } from 'react-native'
import { getAuth } from "firebase/auth"
const HomePage = () => {

  const auth = getAuth();

  function handleSignOut() {
    auth
      .signOut()
      .then(() => console.debug('User is signed out!'));
  }

  return (
    <View>
        <Text>HomePage</Text>
        <Button title='Log Out' onPress={handleSignOut}/>
    </View>
  )
}

export default HomePage