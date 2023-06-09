import { useEffect, useRef } from "react"
import { View, Text, Image, StyleSheet, RefreshControl, TouchableOpacity, Dimensions } from "react-native"
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

import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/app/store"
import { addAerohouseSystem } from "../../redux/features/aeroHouseSlice"
import { addUserDetails } from "../../redux/features/userDetailsSlice"

export function Dashboard(props: any) {

  const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

  const [sysArr, setSysArr] = useState([{
    sysName: '',
    sysID: ''
  }])
  const [sysActive, setSysActive] = useState(0);
  const [fetchDependency, setFetchDependency] = useState(false)
  const [sysIDSelected, setSysIDSelected] = useState('');
  const [refresh, setRefresh] = useState(false);

  const [isLoaded, setisLoaded] = useState(true) // used to check whether the data are loaded
  const userID = useAuth().user?.uid // getting unique user id
  const userRef = doc(db, "users", `${userID}`) // having a reference to the users unique firestore doc
  const systemRef = doc(db, "systems", `aerosystem001`)


  const dispatch = useDispatch();
  const aeroHouseRedux = useSelector((state: RootState) => state)
  const aeroHouse = aeroHouseRedux.aerohouse.aeroHouse
  const userDetails = aeroHouseRedux.userdetails


  useEffect(() => {
   
    const realtimeUpdates = onSnapshot(userRef, (doc) => {

      if(!doc.exists()){
        setRefresh(!refresh)
        return
      }

      dispatch(addAerohouseSystem(doc.data().systems))
      dispatch(addUserDetails(doc.data().user_params))
      setisLoaded(false)

    }, (error) => {
      console.log(error)
    })

     return () => realtimeUpdates()

  }, [refresh])

  const [systemParams, setSystemParams] = useState<any>();

  useEffect(() => {
    const getSystemParams = onSnapshot(systemRef, (doc) => {
      setSystemParams(doc.data())
  })

  return () => getSystemParams()

  }, [sysIDSelected])
  
    console.log('system Params', systemParams)

  function onRefresh() {
    setisLoaded(true)
   setRefresh(!refresh)
  }



  console.log('system Selected === ', sysIDSelected)

  return (
    isLoaded
      ?
      <View style={Style.container}>
        <Text>Loading...</Text>
      </View>
      :
      <SafeAreaView style={[Style.container]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoaded} onRefresh={onRefresh} />
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
                {userDetails.firstname === "update firstname" ? "AeroPepz" : userDetails.firstname}
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

            <AcidityLevelCard acidity={systemParams.acidity}/>
            <TemperatureCard temp={systemParams.temperature}/>
            <HumidityCard humidity={systemParams.humidity}/>

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
          marginHorizontal: 10,
        }}
      >
        {
          aeroHouse.length > 0
            ?
            aeroHouse.map((sys: any, index) => {
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
                  key={index}
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
            :
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AeroHouse')}
            >
              <View
                style={{
                  backgroundColor: Colors.Accent.color,
                  width: WINDOW_WIDTH - 50,
                  height: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  marginBottom: 20
                }}
              >
                <Text style={{
                  color: Colors.White.color,
                  fontFamily: 'font-light'
                }}>No available system.</Text>
                <Text style={{
                  color: Colors.White.color,
                  fontFamily: 'font-light'
                }}>Add one now</Text>
              </View>
            </TouchableOpacity>
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
