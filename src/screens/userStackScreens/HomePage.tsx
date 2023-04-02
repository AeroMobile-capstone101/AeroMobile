import React from "react"
import { View, Text, Button } from "react-native"
import { getAuth } from "firebase/auth"

import { createDrawerNavigator } from "@react-navigation/drawer"
import AeroHouse from "./AeroHouse"

import { DrawerMenu } from "../../components/DrawerMenu"
import { Dashboard } from "./Dashboard"

const Drawer = createDrawerNavigator()

const HomePage = () => {
  const auth = getAuth()

  function handleSignOut() {
    auth.signOut().then(() => {
      console.debug("User is signed out!")
    })
  }
  return (
    // <View>
    //   <Text>HomePage</Text>
    //   <Button title='Log Out' onPress={handleSignOut} />
    // </View>

    <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>
      <Drawer.Screen name='AeroHouse' component={AeroHouse} />
      <Drawer.Screen name='Dashboard' component={Dashboard} />
    </Drawer.Navigator>
  )
}

export default HomePage
