import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../styles/Colors"


const SolidButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles.buttonSolid]}
      onPress={props.onPress}
      >
      <Text style={[styles.buttonText]}>{props.name}</Text>
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
    borderRadius: 30,
  },
  buttonSolid: {
    backgroundColor: Colors.Accent.color,
  },
  buttonText: {
    color: Colors.White.color,
    fontSize: 16,
    fontFamily: "font-md",
  },
})
