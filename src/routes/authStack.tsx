import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../screens/authStakScreens/LoginScreen"
import SignUpScreen from "../screens/authStakScreens/SignUpScreen"
import SplashScreen from "../screens/authStakScreens/SplashScreen"

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName='SplashScreen'>
        <Stack.Screen name='SplashScreen' component={SplashScreen} />
        <Stack.Screen name='LogIn' component={LoginScreen} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AuthStack
