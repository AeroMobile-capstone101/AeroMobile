import { View, Text, StyleSheet } from "react-native"
import GlobalStyle from "../styles/GlobalStyle"
import { MaterialIcons } from "@expo/vector-icons"

export default function HumidityCard() {
  return (
    <View style={[GlobalStyle.cardContainer_sm, GlobalStyle.elevate]}>
      <Text style={GlobalStyle.cardTitle}>Acidity Level</Text>
      <View style={GlobalStyle.cardContentContainer}>
        <Text style={GlobalStyle.cardContentValue}>5.5</Text>
      </View>

      <View style={GlobalStyle.cardIconContainer}>
        <MaterialIcons name='opacity' size={20} color='black' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
