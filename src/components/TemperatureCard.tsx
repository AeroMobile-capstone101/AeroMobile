import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import GlobalStyle from "../styles/GlobalStyle"

export default function TemperatureCard(props: any) {
  return (
    <View style={[GlobalStyle.cardContainer_sm, GlobalStyle.elevate]}>
      <Text style={GlobalStyle.cardTitle}>Temperature</Text>
      <View style={GlobalStyle.cardContentContainer}>
        <Text style={GlobalStyle.cardContentValue}>{props.temp}</Text>
      </View>

      <View style={GlobalStyle.cardIconContainer}>
        <FontAwesome5 name='temperature-low' size={20} color='black' />
      </View>
    </View>
  )
}
