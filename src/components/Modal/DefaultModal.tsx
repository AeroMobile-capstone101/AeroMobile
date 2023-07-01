import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Modal } from 'react-native-paper'
import SolidButton from '../SolidButton'

export default function DefaultModal(props:  any) {
  const [text, setText] = useState('');
  
  return (
      <Modal
        visible={props.visible}
        onDismiss={ props.setVisible }
        contentContainerStyle={customStyles.modalContainerStyle}>
        <Text style={customStyles.modalTitle}>{props.title}</Text>

        {
          props.error.length > 0
            ?
            <Text style={{
              color: 'red',
              fontFamily: 'font-reg',
              fontSize: 12,
              marginBottom: 20,
              width: '100%',
              textAlign: 'center'
            }}>Error: {props.error}</Text>
            : ''
        }
       
        <View style={{ width: "100%", marginBottom: 20 }}>
          <Text style={customStyles.modalLabel}>{props.inputText}</Text>
          <View style={customStyles.inputContainer}>
            <TextInput
                style={customStyles.inputText}
                value={text}
                onChangeText={(t) => setText(t)}
                underlineColorAndroid='transparent'
              />
          </View>
        </View>
        <SolidButton
          name={props.buttonTitle}
          onPress={() => props.onClick(text)}
        />
      </Modal>
    
  )
}

const customStyles = StyleSheet.create({
  modalContainerStyle: {
    backgroundColor: "white",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "900",
    fontSize: 24,
    marginBottom: 30,
  },
  modalLabel: {
    fontWeight: "700",
    marginBottom: 5,
    fontSize: 13,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    paddingHorizontal: 15,
    padding: 10,
    marginBottom: 15,
  },
  inputText: {
    fontSize: 16,
  },
})