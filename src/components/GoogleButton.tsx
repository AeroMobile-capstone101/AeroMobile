import React from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../styles/Colors"
import { AntDesign } from "@expo/vector-icons"

const GoogleButton = () => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "rgba(23,160,141,.1)" }]}>
      <AntDesign name='google' size={20} color='black' />
    </TouchableOpacity>
  )
}

export default GoogleButton

const styles = StyleSheet.create({
  // button global styling
  buttonDisabled: {
    display: "none",
  },
  button: {
    width: 55,
    height: 55,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonSolid: {
    backgroundColor: Colors.Accent.color,
  },
  buttonText: {
    color: Colors.White.color,
    fontSize: 15,
    fontFamily: "font-md",
    marginLeft: 20,
  },
})
