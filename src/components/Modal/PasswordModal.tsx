import { Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Modal } from 'react-native-paper'
import SolidButton from '../SolidButton'
import InputStyle from '../../styles/InputStyle'


export default function PasswordModal(props:  any) {


  function handleUpdate(){
  
    console.log('bawlang')

  }

  return (
      <Modal
        visible={props.visible}
        onDismiss={props.onDismiss}
        contentContainerStyle={InputStyle.modalContainerStyle}>
          <Text style={{
            fontFamily: 'font-md',
            fontSize: 24,
            marginBottom: 20
          }}>Send Password Reset</Text>
        <SolidButton
          name={'Send to Email'}
          onPress={handleUpdate}
        />
      </Modal>
    
  )
}

