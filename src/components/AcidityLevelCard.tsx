import { View, Text  } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import CardStyles from "../styles/CardStyles"
import Colors from "../styles/Colors"

export default function AcidityLevelCard(props: any) {
  return (
    <View style={[CardStyles.cardContainer_sm]}>
      <View style={CardStyles.iconContainer}>
        <MaterialIcons name='opacity' size={24} color={Colors.White.color} />
      </View>

      <Text style={CardStyles.cardContentValue}>{props.acidity} pH</Text>
      <Text style={CardStyles.cardLabel_sm}>Acidity</Text>

    </View>
  )
}


