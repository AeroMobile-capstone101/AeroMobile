import { useEffect } from "react"
import { View, Text, Image, StyleSheet, RefreshControl, TouchableOpacity, Dimensions } from "react-native"
import Style from "../../styles/GlobalStyle"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import { MistMakerCard, HumidityCard, TemperatureCard, LightCard, AcidityLevelCard } from "../../components/components"
import { colorBasedOnTime, handleGreetings } from "../../helpers/greetings"
import { doc, onSnapshot } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useState } from "react"
import Colors from "../../styles/Colors"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../redux/app/store"
import { addAerohouseSystem } from "../../redux/features/aeroHouseSlice"
import { Snackbar } from "react-native-paper"
import { setSnack } from "../../redux/features/snackbarSlice"

const Dashboard = (props: any) => {
  // getting phone screen width and height
  const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');

  // redux
  const dispatch = useDispatch();
  const redux = useSelector((state: RootState) => state)
  const aeroHouse = redux.aerohouse.aeroHouse

  // firebase (db, auth, and etc.)
  const currentUser = auth.currentUser;
  if (currentUser === null) {
    return
  }

  const userID = currentUser.uid                  // getting user unique ID
  const userRef = doc(db, "users_collection", `${userID}`)   // reference to the users doc in a users_collection

  // state
  const [loading, setLoading] = useState(true);
  const [sysActive, setSysActive] = useState(0);
  const [sysIDSelected, setSysIDSelected] = useState('');
  const [systemParams, setSystemParams] = useState<any>();

  // hooks
  useEffect(() => {
    const realtimeUpdates = onSnapshot(userRef, (doc) => {

      if (!doc.exists()) {
        return
      }

      dispatch(addAerohouseSystem(doc.data().systems))
      if (doc.data().systems.length > 0) {
        setSysIDSelected(doc.data().systems[0].sysID)
      }
      setLoading(false)

    }, (error) => {
      console.log(error)
    })
    return () => realtimeUpdates()
  }, [loading])


  useEffect(() => {
    if (sysIDSelected === '') {
      return
    }
    const systemRef = doc(db, "system_collection", `${sysIDSelected}`)

    const getSystemParams = onSnapshot(systemRef, (doc) => {
      setSystemParams(doc.data())
      setLoading(false)

    })
    return () => getSystemParams()

  }, [sysIDSelected])


  //functions
  function onRefresh() {
    setLoading(true)
  }

  // return jsx
  return (
    loading
      ?
      <View style={Style.container}>
        <Text>Loading...</Text>
      </View>
      :
      <View style={[Style.container, { paddingTop: 24 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingBottom: 8
          }}
        >
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
                {
                  currentUser?.displayName === null || currentUser?.displayName === undefined
                    ? "AeroPepz"
                    : currentUser.displayName
                }
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

          {
            aeroHouse.length === 0
              ? ''
              : renderParameters()
          }

        </ScrollView>

        <Snackbar
          duration={1200}
          visible={redux.snackbar.isShown}
          onDismiss={() => dispatch(setSnack({ ...redux.snackbar, isShown: false }))}>
          <Text style={{ textAlign: "center", color: Colors.White.color }}>
            {redux.snackbar.message}
          </Text>
        </Snackbar>

      </View>
  )

  function renderParameters() {
    return (
      <>
        <Text style={customStyle.headingTitle}>Parameters: </Text>
        <MistMakerCard
          mistOnTime={systemParams === undefined ? 0 : systemParams._mistontime}
          mistOffTime={systemParams === undefined ? 0 : systemParams._mistofftime}
          systemID={sysIDSelected}
        />


        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8,
        }}>

          <View style={{ flexDirection: 'row' }}>
            <LightCard systemID={sysIDSelected} lightColor={systemParams === undefined ? Colors.Accent.color : systemParams._lightColor} />
            <TemperatureCard temp={systemParams === undefined ? 0 : systemParams._temperature} />
          </View>

          <View style={{ flexDirection: 'row' }}>
            <AcidityLevelCard acidity={systemParams === undefined ? 0 : systemParams._acidity} />
            <HumidityCard humidity={systemParams === undefined ? 0 : systemParams._humidity} />
          </View>

        </View>

      </>
    )
  }

  function renderSystems() {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginHorizontal: 8,
        }}
      >
        {
          aeroHouse.length > 0
            ?
            aeroHouse.map((sys: any, index) => {
              return (



                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSysActive(index)
                    setSysIDSelected(sys.sysID)
                  }}
                >
                  <View
                    style={[{
                      backgroundColor: sysActive === index ? Colors.Accent.color : Colors.White.color,
                      paddingHorizontal: 24,
                      paddingVertical: 16,
                      marginLeft: 8,
                      borderRadius: 30,
                      marginBottom: 32
                    }]}>
                    <Text style={{
                      fontFamily: 'font-reg',
                      fontSize: 13,
                      color: sysActive === index ? Colors.White.color : Colors.Black.color
                    }}>{sys.sysName}</Text>
                  </View>
                </TouchableOpacity>

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
                  height: 150,
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
      </ScrollView >
    )
  }
}

export default Dashboard

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
