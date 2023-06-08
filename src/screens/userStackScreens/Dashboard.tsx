import React, { useContext, useEffect } from "react"
import { View, Text, Image, StyleSheet, RefreshControl, Touchable, TouchableOpacity } from "react-native"
import Style from "../../styles/GlobalStyle"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { MistMakerCard, HumidityCard, TemperatureCard, LightCard, AcidityLevelCard } from "../../components/components"
import { colorBasedOnTime, handleGreetings } from "../../helpers/helper"
import { useAuth } from "../../hooks/useAuth"
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import db from "../../config/firebase"
import { useState } from "react"
import Colors from "../../styles/Colors"


export function Dashboard() {

  const [userEmail, setUserEmail] = useState("") // user email
  const [firstname, setFirstName] = useState("") // user firstname
  const [isLoaded, setisLoaded] = useState(true) // used to check whether the data are loaded
  const userID = useAuth().user?.uid // getting unique user id
  const userRef = doc(db, "users", `${userID}`) // having a reference to the users unique firestore doc


  const [sysArr, setSysArr] = useState([{
    sysName: '',
    sysID: ''
  }])
  const [sysActive, setSysActive] = useState(0);
  const [fetchDependency, setFetchDependency] = useState(false)
  const [sysIDSelected, setSysIDSelected] = useState('');


  useEffect(() => {
    fetchDataFromFireStore()
  }, [fetchDependency])

  async function fetchDataFromFireStore() {
    const docSnap = await getDoc(userRef)

    try {
      if (!docSnap.exists()) {
        setFetchDependency(!fetchDependency)
      } else {
        setUserEmail(docSnap.data().user_params.email)
        setFirstName(docSnap.data().user_params.firstname)
        setSysArr(docSnap.data().systems)
      }
    } catch (e) {
      console.log(e)
    }

  }

  const onRefresh = React.useCallback(() => {
    setisLoaded(false)
    fetchDataFromFireStore()
    setisLoaded(true)
  }, [])


  return (
    !isLoaded
      ?
      <View style={Style.container}>
        <Text>Loading...</Text>
      </View>
      :
      <SafeAreaView style={[Style.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={!isLoaded} onRefresh={onRefresh} />
          }>
          <View style={customStyle.headerContainer}>
            <View style={{ justifyContent: "center" }}>
              <Text style={customStyle.greeting}>
                <Ionicons
                  name='ios-partly-sunny-outline'
                  size={24}
                  color={colorBasedOnTime()}
                />
                {handleGreetings()}
              </Text>
              <Text style={customStyle.name}>
                {firstname === "update firstname" ? "AeroPepz" : firstname}
              </Text>
            </View>

            <View>
              <Image
                source={require("../../assets/images/AeroHouse.png")}
                style={{ height: 100, width: 100 }}
              />
            </View>
          </View>

          <Text style={customStyle.headingTitle}>AeroHouse Devices: </Text>
          {
            renderSystems()
          }


          <Text style={customStyle.headingTitle}>Parameters: </Text>
          <MistMakerCard />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={{
              width: "100%",
              flexDirection: "row",
              marginBottom: 5,
            }}>

            <AcidityLevelCard />
            <TemperatureCard />
            <HumidityCard />
          </ScrollView>

          <LightCard />
          <View style={{ marginBottom: 25 }}></View>
        </ScrollView>
      </SafeAreaView>
  )

  function renderSystems() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginHorizontal: 10
        }}
      >
        {
          sysArr.map((sys, index) => {
            return (
              <View
                style={[{
                  backgroundColor: sysActive === index ? Colors.Accent.color : Colors.White.color,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  marginLeft: 10,
                  borderRadius: 10,
                  marginBottom: 30
                }, Style.elevate]}
                key={sys.sysID}
              >
                <TouchableOpacity
                  onPress={() => {
                    setSysActive(index)
                    setSysIDSelected(sys.sysID)
                  }}
                  style={{
                  }}
                >
                  <Text style={{
                    fontFamily: 'font-reg',
                    fontSize: 14,
                    color: sysActive === index ? Colors.White.color : Colors.Black.color
                  }}>{sys.sysName}</Text>
                </TouchableOpacity>

              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

const customStyle = StyleSheet.create({
  greeting: {
    fontFamily: "font-md",
    fontSize: 15,
  },
  name: {
    fontFamily: "font-bold",
    fontSize: 25,
    paddingTop: 1,
    paddingBottom: 20,
  },

  systemId: {
    fontFamily: "font-md",
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headingTitle: {
    paddingHorizontal: 15,
    fontFamily: 'font-md',
    fontSize: 15,
    marginBottom: 15
  }
})
