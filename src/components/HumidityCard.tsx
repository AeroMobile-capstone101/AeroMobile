import { View, Text } from "react-native"
import { Entypo } from "@expo/vector-icons"
import CardStyles from "../styles/CardStyles"
import Colors from "../styles/Colors"

export default function HumidityCard(props: any) {
  return (
    <View style={[CardStyles.cardContainer_sm]}>
      <View style={CardStyles.iconContainer}>
      <Entypo name='air' size={24} color={Colors.White.color} />
      </View>

      <Text style={CardStyles.cardContentValue}>{props.humidity} %</Text>
      <Text style={CardStyles.cardLabel_sm}>Humidity</Text>

    </View>
  )
}
