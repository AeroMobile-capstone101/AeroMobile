import React from "react"
import { View, Text } from "react-native"
import Style from "../styles/GlobalStyle"

export default function LoaderScreen() {
  return (
    <View style={Style.container}>
      <Text>Loading...</Text>
    </View>
  )
}
