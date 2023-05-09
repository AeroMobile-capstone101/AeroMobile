import { View, Text, StyleSheet } from "react-native"
import GlobalStyle from "../styles/GlobalStyle"
import { Entypo } from "@expo/vector-icons"

export default function HumidityCard() {
  return (
    <View style={[GlobalStyle.cardContainer_sm, GlobalStyle.elevate]}>
      <Text style={GlobalStyle.cardTitle}>Humidity</Text>
      <View style={GlobalStyle.cardContentContainer}>
        <Text style={GlobalStyle.cardContentValue}>80</Text>
      </View>

      <View style={GlobalStyle.cardIconContainer}>
        <Entypo name='air' size={20} color='black' />
      </View>
    </View>
  )
}
