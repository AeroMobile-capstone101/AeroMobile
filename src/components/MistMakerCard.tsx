import React, { useState } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import Style from "../styles/GlobalStyle"
import Colors from "../styles/Colors"
import { TextInput } from "react-native-paper"

import { useSelector, useDispatch } from 'react-redux'
import { handleOffTime, handleOnTime } from "../redux/features/mistMakerSlice"
import { RootState } from "../redux/app/store"
import SolidButton from "./SolidButton"

interface mistTimeFormat {
  offTime: number,
  onTime: number
}
export default function () {
  const dispatch = useDispatch();
  const timeValue = useSelector((state: RootState) => state.mistmaker)

  const [time, setTime] = useState<mistTimeFormat>({
    offTime: 0,
    onTime: 0
  })

  return (
    <View style={[Style.elevate, styles.cardContainer]}>
      <View>
        <Text style={[styles.cardTitle]}> Mist Maker Settings</Text>

        <View style={{ marginTop: 24}}>

          <View style={styles.inputParentView}>
            <TextInput
              mode="outlined"
              keyboardType='number-pad'
              label='On Time'
              value={time.onTime === 0 ? '' : `${time.onTime}`}
              onChangeText={(value) => setTime({...time, onTime: Number(value) })}
              activeOutlineColor={Colors.Accent.color}
              style={styles.inputText}
            />
          </View>

          <View style={styles.inputParentView}>

            <TextInput
              mode="outlined"
              keyboardType='numeric'
              label='Off Time'
              value={time.offTime === 0 ? '' : `${time.offTime}`}
              onChangeText={(value) => setTime({...time, offTime: Number(value) })}
              activeOutlineColor={Colors.Accent.color}
              style={styles.inputText}
            />

          </View>

          <View style={[styles.inputParentView, {marginTop: 20}]}>
            <SolidButton
              name={'Set'}
              onPress={() => {
                dispatch(handleOffTime(time.offTime))
                dispatch(handleOnTime(time.onTime))
                console.log(timeValue)
              }}
            />
          </View>
        </View>
      </View>
      <View>
        <Image
          source={require("../assets/images/hardwares/Humidifier.png")}
          style={{ height: 215, width: 100 }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.White.color,
    padding: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitle: {
    fontFamily: "font-bold",
    fontSize: 15,
  },
  inputParentView: {
    marginTop: 5,
  },
  mistCont: {
    width: "60%",
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderRadius: 5,
    borderWidth: 2,
  },
  inputText: {
    fontSize: 13,
    height: 45,
    backgroundColor: Colors.White.color
  },
  labelText: {
    fontFamily: "font-md",
    fontSize: 12,
    paddingLeft: 1,
    marginBottom: 5,
  },
})
