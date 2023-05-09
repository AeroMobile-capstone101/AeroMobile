import { View, Text, StyleSheet } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import {
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore"
import { useAuth } from "../../hooks/useAuth"
import db from "../../config/firebase"



function SystemCard({ data, index }: any) {

  const userID = useAuth().user?.uid
  const userDbRef = doc(db, "users", `${userID}`)

  async function handleDeleteSystem(name: string, ID: string) {
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
        <Text style={styles.systemName}>{` ${index + 1}. ${
          data.sysName
        }`}</Text>
        <Text style={styles.dataContainer_ID}>{`${data.sysID}`}</Text>
      </View>
      <AntDesign name='delete' size={20} color='red' onPress={() => {}} />
    </View>
  )
}

export default SystemCard

const styles = StyleSheet.create({
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
})
