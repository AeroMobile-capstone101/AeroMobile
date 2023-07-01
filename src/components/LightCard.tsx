import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import Colors from "../styles/Colors"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import CardStyles from "../styles/CardStyles"
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function LightCard(props: any) {
console.log(props.lightColor);

  //state
  const [selectedColor, setSelectedColor] = useState('blue');
  const buttonColors = ['off', 'red', 'blue'];

  //functions
  async function handleLightColorUpdate(color: string) {
    console.log(props.systemID);

    const systemRef = doc(db, "system_collection", `${props.systemID}`);

    await setDoc(systemRef, {
      _lightColor: color
    }, { merge: true })
      .then(() => {
       // run the snackbar here
      })
      .catch(() => {

      })
  }

  

  //return jsx
  return (
    <View style={[CardStyles.cardContainer_sm]}>

      <View style={CardStyles.icon}>
        <MaterialCommunityIcons name='home-lightbulb-outline' size={48} color={props.lightColor === 'off' ? 'gray' : props.lightColor} />

      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {
          buttonColors.map((color) => (<ButtonColor key={color} color={color} onClick={() => handleLightColorUpdate(color)} />))
        }

      </View>

      <Text style={CardStyles.cardLabel_sm}>Lighting</Text>


    </View>

  )

}

// other components
function ButtonColor(props: any) {
  return (
    <TouchableOpacity
      key={props.color}
      onPress={props.onClick}
      style={{
        backgroundColor: props.color === 'off' ? 'white' : props.color,
        borderWidth: props.color === 'off' ? 1.2 : 0,
        borderColor: props.color === 'off' ? 'gray' : '',
        height: 24,
        width: 24,
        borderRadius: 8,
        marginRight: 4
      }}
    >
    </TouchableOpacity>
  )
}



