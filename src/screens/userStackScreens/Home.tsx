import React from "react"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

//import { DrawerMenu } from "../../components/DrawerMenu"
import { Dashboard } from "./Dashboard"
import AeroHouse from "./AeroHouse"
import Settings from "./Settings"

import Colors from "../../styles/Colors"

import { AntDesign } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

const Tab = createBottomTabNavigator()

//tab navigator styling
const tabNavigatorOptions = {
  tabBarLabelStyle: { fontFamily: "font-md", fontSize: 11 },
  tabBarStyle: { height: 60, paddingBottom: 5 },
  headerShown: false,
  tabBarActiveTintColor: Colors.Accent.color,
  tabBarIconStyle: { marginTop: 10 },
}

export default function () {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={tabNavigatorOptions}>
      <Tab.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ size, color }) => (
            <AntDesign name='home' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='AeroHouse'
        component={AeroHouse}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name='hubspot' size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name='settings-outline' size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
