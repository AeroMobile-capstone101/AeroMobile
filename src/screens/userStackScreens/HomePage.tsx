import React from "react"

import { createDrawerNavigator } from "@react-navigation/drawer"
import AeroHouse from "./AeroHouse"

import { DrawerMenu } from "../../components/DrawerMenu"
import { Dashboard } from "./Dashboard"

const Drawer = createDrawerNavigator()

const HomePage = () => {
  return (
    <Drawer.Navigator
      initialRouteName='Dashboard'
      drawerContent={(props) => <DrawerMenu {...props} />}>
      <Drawer.Screen name='Dashboard' component={Dashboard} />
      <Drawer.Screen name='AeroHouse' component={AeroHouse} />
    </Drawer.Navigator>
  )
}

export default HomePage
