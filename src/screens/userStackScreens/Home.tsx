import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AeroHouse from "./aerohouse/AeroHouse"
import Colors from "../../styles/Colors"
import { AntDesign } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { createStackNavigator } from '@react-navigation/stack';
import SystemGraph from "./aerohouse/SystemGraph"
import Settings from "./Settings"
import Dashboard from "./Dashboard"



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AeroHouseStackNavigator(){
  return(
    <Stack.Navigator
    initialRouteName="Aerohouse"
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name='Aerohouse' component={AeroHouse}/>
        <Stack.Screen name='SystemGraph' component={SystemGraph}/>
    </Stack.Navigator>
  )
}


//tab navigator styling
const tabNavigatorOptions = {
  tabBarLabelStyle: { fontFamily: "font-md", fontSize: 11 },
  tabBarStyle: { height: 60, paddingBottom: 5 },
  headerShown: false,
  tabBarActiveTintColor: Colors.Accent.color,
  tabBarIconStyle: { marginTop: 10 },
}

export default function Home() {
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
        component={AeroHouseStackNavigator}
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
