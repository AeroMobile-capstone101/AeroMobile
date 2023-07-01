import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import {
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore"
import { useAuth } from "../../hooks/useAuth"
import { db } from "../../config/firebase"
import { Dialog, Portal } from "react-native-paper"
import { useState } from "react"
import Colors from "../../styles/Colors"


function SystemCard({ data, index }: any) {

  // variables
  const userID = useAuth().user?.uid

  //state
  const [showDialog, setShowDialog] = useState(false);


  //functions
  async function handleDeleteSystem(ID: string, name: string) {
    const userDbRef = doc(db, "users_collection", `${userID}`)

    await updateDoc(userDbRef, {
      systems: arrayRemove({
        sysName: name,
        sysID: ID,
      }),
    })
  }

  return (
    <View style={styles.dataContainer}>
      <View>
        <Text style={styles.systemName}>{`${data.sysName}`}</Text>
        <Text style={styles.dataContainer_ID}>{`${data.sysID}`}</Text>
      </View>
      <AntDesign name='delete' size={20} color='red' onPress={() => setShowDialog(true)} />

      <Portal>
        <Dialog
          style={{
            backgroundColor: 'white'
          }}
          visible={showDialog}
          onDismiss={() => setShowDialog(false)}
        >
          <Dialog.Content>
            <Text style={{
              fontSize: 15,
              fontWeight: '500'
            }}>Do you really want to delete {data.sysName} ? </Text>
          </Dialog.Content>

          <Dialog.Actions>
            <TouchableOpacity
              onPress={() => {
                console.log('cancelled')
                setShowDialog(false)
              }}
            >
              <Text style={{
                color: Colors.Accent.color,
                fontWeight: '500',
                marginRight: 15
              }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
               console.log( handleDeleteSystem(data.sysID, data.sysName))
                setShowDialog(false)
              }}
            >
              <Text style={{
                  color: Colors.Accent.color,
                  fontWeight: '500'
              }}>Ok</Text>
            </TouchableOpacity>

          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default SystemCard

const styles = StyleSheet.create({
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: 8,
  },
  dataContainer_ID: {
    paddingTop: 8,
    paddingHorizontal: 8,
    fontFamily: "font-reg",
    fontSize: 12,
  },
  systemName: {
    fontWeight: '700',
    fontSize: 16,
    paddingHorizontal: 8
  },
})
