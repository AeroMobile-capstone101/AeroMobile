import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Colors from "../styles/Colors"
import Style from "../styles/GlobalStyle"
import { Button } from "react-native-paper"

export default function LightCard() {
  return (
    <View style={[styles.cardContainer, Style.elevate]}>
      <Text style={styles.cardTitle}>Grow Light Settings</Text>

      <View style={styles.contentContainer}>
        <View style={{ width: "35%" }}>
          <Text style={styles.selectColorText}>Select Color: </Text>
          <Button
            style={styles.button}
            mode='contained'
            buttonColor={Colors.Accent.color}
            onPress={() => console.debug("Green pressed")}>
            Green
          </Button>

          <Button
            style={styles.button}
            mode='contained'
            buttonColor='skyblue'
            onPress={() => console.debug("Blue pressed")}>
            Blue
          </Button>

          <Button
            style={styles.button}
            mode='contained'
            buttonColor='red'
            onPress={() => console.debug("Red pressed")}>
            Red
          </Button>
        </View>

        <View
          style={{
            width: "65%",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Text style={styles.percentage}>75</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.White.color,
    padding: 15,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily: "font-bold",
    fontSize: 16,
  },
  contentContainer: {
    flexDirection: "row",
  },
  selectColorText: {
    fontFamily: "font-md",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginVertical: 5,
  },
  percentage: {
    fontFamily: "font-bold",
    fontSize: 50,
  },
})
