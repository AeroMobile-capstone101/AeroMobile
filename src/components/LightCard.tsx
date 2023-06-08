import React from "react"
import { View, Text, StyleSheet, Button } from "react-native"
import Colors from "../styles/Colors"
import Style from "../styles/GlobalStyle"
import ButtonCircle from "./button/ButtonCircle"

import { useSelector, useDispatch } from 'react-redux'
import { updateGrowLightColor } from "../redux/features/growLightSlice"
import { RootState } from "../redux/app/store"



export default function LightCard() {
  const dispatch = useDispatch()
  const color = useSelector((state: RootState) => console.log(state.growLight.color)  )
  
  return (
    <View style={[styles.cardContainer, Style.elevate]}>
      <Text style={styles.cardTitle}>Grow Light Settings</Text>

      <View style={{

      }}>
        <View style={{ width: '50%' }}>

          <Text style={styles.selectColorText}>Select Light Color: </Text>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>

            <ButtonCircle
              onClick={() => dispatch(updateGrowLightColor('red'))}
              title={'Red'}
              backgroundColor={'red'}
              textColor={'white'}
              height={50}
            />
            <ButtonCircle
              onClick={() => dispatch(updateGrowLightColor('blue'))}
              title={'Blue'}
              backgroundColor={'blue'}
              height={50}
              textColor={'white'}
            />

          </View>

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
  selectColorText: {
    fontFamily: "font-md",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginVertical: 5
  },
  percentage: {
    fontFamily: "font-bold",
    fontSize: 50,
  },
})
