import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../styles/Colors"

type propsVal = {
  name: string
  func: any
}

const SolidButton = ({ name, func }: propsVal) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonSolid]}
      onPress={func}>
      <Text style={[styles.buttonText]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default SolidButton

const styles = StyleSheet.create({
  // button global styling
  buttonDisabled: {
    display: "none",
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonSolid: {
    backgroundColor: Colors.Accent.color,
  },
  buttonText: {
    color: Colors.White.color,
    fontSize: 15,
    fontFamily: "font-md",
  },
})
