import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../styles/Colors"

type propsVal = {
  name: string
  func: any
}

const WhiteButton = ({ name, func }: propsVal) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonSolid]}
      onPress={func}>
      <Text style={[styles.buttonText]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default WhiteButton

const styles = StyleSheet.create({
  // button global styling
  buttonDisabled: {
    display: "none",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonSolid: {
    backgroundColor: Colors.White.color,
  },
  buttonText: {
    color: Colors.Black.color,
    fontSize: 15,
    fontWeight: "bold",
  },
})
