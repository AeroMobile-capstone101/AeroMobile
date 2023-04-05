import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import HomePage from "../screens/userStackScreens/HomePage"

export default function UserStack() {
  return (
    <NavigationContainer>
      <HomePage />
    </NavigationContainer>
  )
}
