import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import Home from "../screens/userStackScreens/Home"

export default function UserStack() {
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  )
}
