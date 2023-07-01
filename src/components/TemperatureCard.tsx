import { View, Text, StyleSheet } from "react-native"
import { FontAwesome5 } from "@expo/vector-icons"
import GlobalStyle from "../styles/GlobalStyle"
import CardStyles from "../styles/CardStyles"
import Colors from "../styles/Colors"

export default function TemperatureCard(props: any) {
  return (
    <View style={[CardStyles.cardContainer_sm]}>
      <View style={CardStyles.iconContainer}>
        <FontAwesome5 name='temperature-low' size={24} color={Colors.White.color} />
      </View>

      <Text style={CardStyles.cardContentValue}>{props.temp} °C</Text>
      <Text style={CardStyles.cardLabel_sm}>Temperature</Text>

    </View>
  )
}
