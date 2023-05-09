import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import GlobalStyle from "../styles/GlobalStyle"

export default function TemperatureCard() {
  return (
    <View style={[GlobalStyle.cardContainer_sm, GlobalStyle.elevate]}>
      <Text style={GlobalStyle.cardTitle}>Temperature</Text>
      <View style={GlobalStyle.cardContentContainer}>
        <Text style={GlobalStyle.cardContentValue}>37</Text>
      </View>

      <View style={GlobalStyle.cardIconContainer}>
        <FontAwesome5 name='temperature-low' size={20} color='black' />
      </View>
    </View>
  )
}
