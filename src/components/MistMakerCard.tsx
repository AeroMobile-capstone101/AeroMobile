import React from "react"
import { View, Text, Image, StyleSheet, TextInput } from "react-native"
import Style from "../styles/GlobalStyle"
import Colors from "../styles/Colors"

export default function () {
  const [mistStart, setMistStart] = React.useState("")
  const [mistEnd, setMistEnd] = React.useState("")
  return (
    <View style={[Style.elevate, styles.cardContainer]}>
      <View>
        <Text style={[styles.cardTitle]}> Mist Maker Settings</Text>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontFamily: "font-md", fontSize: 15 }}>
            Set Maker Interval
          </Text>

          <View style={styles.inputParentView}>
            <Text style={styles.labelText}>On time: </Text>
            <View style={styles.mistCont}>
              <TextInput
                keyboardType='number-pad'
                style={styles.inputText}
                placeholder='5sec'
                value={mistStart}
                onChangeText={(text) => setMistStart(text)}
              />
            </View>
          </View>

          <View style={styles.inputParentView}>
            <Text style={styles.labelText}>Off time: </Text>
            <View style={styles.mistCont}>
              <TextInput
                keyboardType='numeric'
                style={styles.inputText}
                placeholder='5sec'
                value={mistEnd}
                onChangeText={(text) => setMistEnd(text)}
              />
            </View>
          </View>
        </View>
      </View>
      <View>
        <Image
          source={require("../assets/images/hardwares/Humidifier.png")}
          style={{ height: 200, width: 90 }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.White.color,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily: "font-bold",
    fontSize: 15,
  },
  inputParentView: {
    marginTop: 10,
  },
  mistCont: {
    width: "60%",
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "gray",
  },
  inputText: {
    fontFamily: "font-reg",
    paddingHorizontal: 5,
  },
  labelText: {
    fontFamily: "font-md",
    fontSize: 12,
    paddingLeft: 1,
    marginBottom: 5,
  },
})
