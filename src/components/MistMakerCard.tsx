import React, { useState } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import Colors from "../styles/Colors"
import { TextInput } from "react-native-paper"
import SolidButton from "./SolidButton"
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

  async function handleMistUpdate(on: number, off: number) {
    const systemRef = doc(db, "system_collection", `${props.systemID}`);

    await setDoc(systemRef, {
      mistontime: on,
      mistofftime: off
    }, { merge: true })
  }

  return (
    <View style={[{ flexDirection: "row", justifyContent: "space-between" }, CardStyles.cardContainer]}>
      <View style={{width: '55%'}}>
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
              theme={{roundness: 30}}
            />
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
                theme={{roundness: 30}}
              />
        
          </View>

          <View style={[styles.inputParentView, { marginTop: 24 }]}>
            <SolidButton
              name={'Set'}
              onPress={() => {
                handleMistUpdate(time.onTime, time.offTime)
                console.log(time.onTime, time.offTime)
              }}
            />
          </View>
        </View>
      </View>

      <View style={{position: 'absolute', right: 16, bottom: 16}}>
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
    marginTop: 8,
    
  },
  inputText: {
    fontSize: 13,
    height: 48,
    backgroundColor: Colors.White.color,
    paddingHorizontal: 8
  },
  labelText: {
    fontFamily: "font-md",
    fontSize: 13,
    paddingLeft: 1,
    marginBottom: 5,
  },
})
