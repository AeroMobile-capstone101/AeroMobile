import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native"
import { useEffect, useLayoutEffect, useState } from "react"
import Style from "../../styles/GlobalStyle"
import SolidButton from "../../components/SolidButton"
import SystemCard from "../../components/aerohouse/SystemCard"

import {
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore"
import { useAuth } from "../../hooks/useAuth"
import db from "../../config/firebase"
import { SafeAreaView } from "react-native-safe-area-context"
import Colors from "../../styles/Colors"
import { Modal, Snackbar, FAB } from "react-native-paper"

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/app/store"

interface systemParams {
  sysID: string
  sysName: string
}

const AeroHouse = () => {

  const dispatch = useDispatch();
  const systems = useSelector((state: RootState) => state.aerohouse.aeroHouse)

  const userID = useAuth().user?.uid
  const userDbRef = doc(db, "users", `${userID}`)

  const [loading, setLoading] = useState(false)

  const [snackbar, setSnackBar] = useState({
    isShown: false,
    title: "",
  })

  const [showModal, setShowModal] = useState(false)
  const [systemID, setSystemID] = useState('')

  async function handleAddSystem(ID: string) {
    if(ID === ''){
      console.log('Cannot be empty')
      return
    }

    const systemRef = doc(db, "systems", `${ID}`)
    const docSnap = await getDoc(systemRef)

    if(!docSnap.exists()){
      console.log('system not available')
      return 
    }
    else if(systems.find((system: any) => system.sysID === ID)){
      console.log('system already added')
      return
    }

    const systemName = docSnap.data().systemName
   
    try {
      await updateDoc(userDbRef, {
        systems: arrayUnion({
          sysID: ID, 
          sysName: systemName
        }),
      })
      setShowModal(false)
      
    } catch (e) {
      console.log(e)
    }
  }

  return (
    loading
      ?
      <View style={Style.container}>
        <Text>Loading...</Text>
      </View>
      :

      <SafeAreaView style={[Style.container, { paddingHorizontal: 20 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}>
          <Text style={styles.pageTitle}>AeroHouse Devices</Text>

          {
            systems.length > 0
              ?
              systems.map((data, index) => (
                <SystemCard data={data} index={index} key={index} />
              ))
              : emptyCard()
          }

        </ScrollView>

        <FAB
          style={{
            backgroundColor: Colors.Accent.color,
            borderRadius: 1000,
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          small
          color={Colors.White.color}
          icon="plus"
          onPress={() => {
            setSystemID('')
            setShowModal(true)
          }}
        />

        <Modal
          visible={showModal}
          onDismiss={() => setShowModal(false)}
          contentContainerStyle={styles.modalContainerStyle}>
          <Text style={styles.modalTitle}>Add System</Text>

          <View style={{ width: "100%", marginBottom: 20 }}>
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
            onPress={() => { handleAddSystem(systemID)}}
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

  function emptyCard() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={{
          color: Colors.White.color,
          fontFamily: 'font-light'
        }}> No Available Systems. </Text>
        <Text style={{
          color: Colors.White.color,
          fontFamily: 'font-light'
        }}> Click the + button to add. </Text>
      </View>
    )
  }
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
    height: 150,
    backgroundColor: Colors.Accent.color,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
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
