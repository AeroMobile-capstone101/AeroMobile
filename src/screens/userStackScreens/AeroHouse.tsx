import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native"
import { useEffect, useState } from "react"
import Style from "../../styles/GlobalStyle"
import SolidButton from "../../components/SolidButton"
import SystemCard from "../../components/aerohouse/SystemCard"

import {
  doc,
  collection,
  updateDoc,
  query,
  onSnapshot,
  deleteDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore"
import { useAuth } from "../../hooks/useAuth"
import db from "../../config/firebase"
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../styles/Colors"
import { Modal, Snackbar } from "react-native-paper"

interface systemParams {
  sysID: string
  sysName: string
}

const AeroHouse = () => {
  const [sysData, setSysData] = useState<systemParams[]>([])
  const [loading, setLoading] = useState(true)
  const userID = useAuth().user?.uid
  const userDbRef = doc(db, "users", `${userID}`)
  // const systemRef = query(collection(userDbRef, "aero_systems")) // used to query in subcollection

  const [snackbar, setSnackBar] = useState({
    isShown: false,
    title: "",
  })
  const [showModal, setShowModal] = useState(false)
  const [systemID, setSystemID] = useState("")
  const [systemName, setSystemName] = useState("")

  // useEffect to query the created systems
  useEffect(() => {
    const fetchSystems = onSnapshot(userDbRef, (systemSnapshot) => {
      const sysDataArr = []
      const data = systemSnapshot.data()?.systems

      try {
        for (let i = 0; i < data.length; i++) {
          sysDataArr.push({
            sysID: data[i].sysID,
            sysName: data[i].sysName,
          })
        }
      } catch (e) {
        setTimeout(() => {
          setLoading(true)
        }, 200)
      }
      setSysData(sysDataArr)
    })

    //  setSysData(systems)
    setLoading(false)

    return () => {
      fetchSystems()
    }
  }, [loading])

  const handleSystemCheckAvailabiltyToFirestore = async (systemID: string) => {
    // checking if the system exist
    const docRef = doc(db, "systems", systemID)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      // add the id to the user db
      const sysName = docSnap.data().name
      handleAddSystem(sysName, systemID)
    } else {
      console.log("No such system!")
    }
  }

  async function handleAddSystem(name: string, ID: string) {
    try {
      await updateDoc(userDbRef, {
        systems: arrayUnion({
          sysName: name,
          sysID: ID,
        }),
      })
    } catch (e) {
      console.log(e)
    }
  }


  if (loading) {
    return (
      <View style={Style.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[Style.container, { paddingHorizontal: 20 }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}>
        <Text style={styles.pageTitle}>AeroHouse Devices</Text>

        {sysData.length !== 0 ? (
          sysData.map((data, index) => (
            <SystemCard data={data} index={index} key={index} />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text> No Available Systems. </Text>
            <Text> Click the + button to add. </Text>
          </View>
        )}

        <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
          <View style={{ width: "30%" }}>
            <SolidButton name='+' func={() => setShowModal(true)} />
          </View>
        </View>
      </ScrollView>

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
        <SolidButton
          name='Add'
          func={() => handleSystemCheckAvailabiltyToFirestore(systemID)}
        />
      </Modal>

      <Snackbar
        duration={1000}
        visible={snackbar.isShown}
        onDismiss={() => setSnackBar({ ...snackbar, isShown: false })}>
        <Text style={{ textAlign: "center", color: Colors.White.color }}>
          {snackbar.title}
        </Text>
      </Snackbar>
    </SafeAreaView>
  )
}

export default AeroHouse

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
