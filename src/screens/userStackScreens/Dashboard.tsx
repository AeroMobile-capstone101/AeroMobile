import React, { useContext, useEffect } from "react"
import { View, Text, Image, StyleSheet, RefreshControl } from "react-native"
import Style from "../../styles/GlobalStyle"
import { ScrollView } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import {
  MistMakerCard,
  HumidityCard,
  TemperatureCard,
  LightCard,
  AcidityLevelCard,
} from "../../components/components"

import { useAuth } from "../../hooks/useAuth"
import { doc, onSnapshot } from "firebase/firestore"
import db from "../../config/firebase"
import { useState } from "react"

interface userParams {
  // an interface to type check user data
  firstname: string
  email: string
  password: string
}

export function Dashboard() {
  const [userEmail, setUserEmail] = useState("") // user email
  const [firstname, setFirstName] = useState("") // user firstname
  const [isLoaded, setisLoaded] = useState(true) // used to check whether the data are loaded
  const userID = useAuth().user?.uid // getting unique user id
  const userRef = doc(db, "users", `${userID}`) // having a reference to the users unique firestore doc

  let hour = new Date().getHours()
  const colorBasedOnTime = () => {
    const colors = [
      "#05004e", // 00:00
      "#15085f", // 01:00
      "#252e6b", // 02:00
      "#31668a", // 03:00
      "#3c8dad", // 04:00
      "#4eb3d3", // 05:00
      "#75c6c0", // 06:00
      "#9fd4b4", // 07:00
      "#c5e5af", // 08:00
      "#e3e0a1", // 09:00
      "#dbcf8f", // 10:00
      "#ffcd81", // 11:00
      "#ff9e5f", // 12:00
      "#ff6c5c", // 13:00
      "#f83f59", // 14:00
      "#cc2a56", // 15:00
      "#9c1e53", // 16:00
      "#6e154f", // 17:00
      "#470b45", // 18:00
      "#310a3d", // 19:00
      "#22082f", // 20:00
      "#19062a", // 21:00
      "#0f031c", // 22:00
      "#000000", // 23:00
    ]
    return colors[hour]
  }

  const handleGreetings = () => {
    if (hour >= 0 && hour < 12) {
      return "Good Morning,"
    } else if (hour >= 12 && hour < 18) {
      return "Good Afternoon,"
    } else {
      return "Good Evening,"
    }
  }

  const fetchUserDetails = onSnapshot(userRef, (doc) => {
    let userDetails: userParams

    if (doc.exists()) {
      userDetails = doc.data().user_params
      setUserEmail(userDetails.email)
      setFirstName(userDetails.firstname)
    }
  })

  console.debug(userEmail + " : " + firstname)

  const onRefresh = React.useCallback(() => {
    setisLoaded(false)
    fetchUserDetails()
    setisLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <View style={Style.container}>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={[Style.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={!isLoaded} onRefresh={onRefresh} />
        }
        style={{
          paddingTop: 10,
          width: "100%",
          paddingHorizontal: 15,
        }}>
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
})
