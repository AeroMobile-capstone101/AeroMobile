import { useState } from "react"
import { Modal } from "react-native-paper"
import { StyleSheet, View, Text, TextInput } from "react-native"
import Colors from "../../styles/Colors"
import SolidButton from "../SolidButton"

function CustomModal() {
  const [showModal, setShowModal] = useState(false)
  const [systemName, setSystemName] = useState("")
  const [systemID, setSystemID] = useState("")

  return (
    <Modal
      visible={showModal}
      onDismiss={() => setShowModal(false)}
      contentContainerStyle={styles.modalContainerStyle}>
      <Text style={styles.modalTitle}>Add System</Text>

      <View style={{ width: "100%", marginBottom: 20 }}>
        <Text style={styles.modalLabel}>System Name:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            value={systemName}
            onChangeText={(text) => setSystemName(text)}
            underlineColorAndroid='transparent'
          />
        </View>
        <Text style={styles.modalLabel}>System ID:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputText}
            value={systemID}
            onChangeText={(text) => setSystemID(text)}
            underlineColorAndroid='transparent'
          />
        </View>
      </View>
      <SolidButton name='Add' func={() => console.debug("bawlang")} />
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  pageTitle: {
    fontFamily: "font-bold",
    fontSize: 25,
    textAlign: "center",
    marginVertical: 20,
  },
  emptyContainer: {
    backgroundColor: Colors.Accent.color,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    textAlign: "center",
    marginVertical: 20,
  },
  dataContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  dataContainer_ID: {
    paddingTop: 10,
    paddingHorizontal: 10,
    fontFamily: "font-reg",
    fontSize: 12,
  },
  systemName: {
    fontFamily: "font-bold",
    fontSize: 15,
  },
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
