import React, { useState } from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../styles/Colors"
import { TextInput } from "react-native-paper"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import CardStyles from "../styles/CardStyles"

interface mistTimeFormat {
  offTime: number,
  onTime: number
}
export default function (props: any) {


  const [time, setTime] = useState<mistTimeFormat>({
    offTime: 0,
    onTime: 0
  })

  async function handleMistOnTimeUpdate(onTime: number) {
    const systemRef = doc(db, "system_collection", `${props.systemID}`);
    await setDoc(systemRef, {
      _mistOnTime: onTime
    }, { merge: true }).then(() => {
      setTime({...time, onTime: 0})
    })
  }

  async function handleMistOffTimeUpdate(offTime: number) {
    const systemRef = doc(db, "system_collection", `${props.systemID}`);
    await setDoc(systemRef, {
     _mistOffTime: offTime
    }, { merge: true })
  }

  return (
    <View style={[{ flexDirection: "row", justifyContent: "space-between" }, CardStyles.cardContainer]}>
      <View style={{ width: '55%' }}>
        <Text style={[CardStyles.cardTitle]}> Mist Maker Settings</Text>

        <View style={{ marginTop: 16 }}>

          <View style={styles.inputParentView}>
            <TextInput
              mode="outlined"
              keyboardType='number-pad'
              label='On Time'
              value={time.onTime === 0 ? '' : `${time.onTime}`}
              onChangeText={(value) => setTime({ ...time, onTime: Number(value) })}
              activeOutlineColor={Colors.Accent.color}
              style={styles.inputText}
              theme={{ roundness: 30 }}
            />

            <View style={styles.mistLabelParent}>
              <Text style={styles.mistLabel}>Current On Time: {props.mistOnTime} mins</Text>
            </View>

            <TouchableOpacity
              onPress={() => handleMistOnTimeUpdate(time.onTime)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Set</Text>

            </TouchableOpacity>
          </View>

          <View style={styles.inputParentView}>

            <TextInput
              mode="outlined"
              keyboardType='numeric'
              label='Off Time'
              value={time.offTime === 0 ? '' : `${time.offTime}`}
              onChangeText={(value) => setTime({ ...time, offTime: Number(value) })}
              activeOutlineColor={Colors.Accent.color}
              style={[styles.inputText]}
              theme={{ roundness: 30 }}
            />
      

            <View style={styles.mistLabelParent}>
              <Text style={styles.mistLabel}>Current Off Time: {props.mistOffTime} mins</Text>
            </View>

            <TouchableOpacity
              onPress={() => {handleMistOffTimeUpdate(time.offTime)}}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Set</Text>

            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ position: 'absolute', right: 16, bottom: 16 }}>
        <Image
          source={require("../assets/images/hardwares/Humidifier.png")}
          style={{ height: 200, width: 85 }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({

  inputParentView: {
    marginVertical: 8,
    alignItems: 'flex-start'
  },
  inputText: {
    fontSize: 13,
    height: 48,
    width: 170,
    backgroundColor: Colors.White.color,
    paddingHorizontal: 8,

  },
  labelText: {
    fontFamily: "font-md",
    fontSize: 13,
    paddingLeft: 1,
    marginBottom: 5,
  },
  mistLabelParent: {
    paddingLeft: 5,
    width: 170,
    marginVertical: 8
  },
  mistLabel: {
    fontFamily: "font-md",
    fontSize: 13,
  },
  button: {
    backgroundColor: Colors.Accent.color,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 30,
    marginTop: 8
  },
  buttonText: {
    color: Colors.White.color,
    fontFamily: 'font-reg'
  }
})
