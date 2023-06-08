import React from "react"
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native"
import SolidButton from "../../components/SolidButton"
import { signOut, getAuth } from "firebase/auth"

import ProfileCard from "../../components/settings/ProfileCard"
import Colors from "../../styles/Colors"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { MaterialIcons, SimpleLineIcons, FontAwesome } from "@expo/vector-icons"

const Settings = () => {
  const auth = getAuth() // having reference user auth details

  return (
    <ScrollView style={customStyles.scrlViewStyle}>
      <Text style={customStyles.label}> Profile </Text>
      <ProfileCard />

      <Text style={customStyles.label}> Settings </Text>

      <TouchableWithoutFeedback>
        <View style={customStyles.settingContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <MaterialIcons name='person-add-alt-1' size={24} />
            <Text style={customStyles.updateText}>Update Firstname</Text>
          </View>

          <SimpleLineIcons name='arrow-right' size={20} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View style={customStyles.settingContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <MaterialIcons name='person-add-alt-1' size={24} />
            <Text style={customStyles.updateText}>Update Lastname</Text>
          </View>

          <SimpleLineIcons name='arrow-right' size={20} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback>
        <View style={customStyles.settingContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <FontAwesome name='lock' size={24} />
            <Text style={customStyles.updateText}>Update Password</Text>
          </View>

          <SimpleLineIcons name='arrow-right' size={20} />
        </View>
      </TouchableWithoutFeedback>

      <View style={customStyles.button}>
        <SolidButton name='Logout' func={() => signOut(auth)} />
      </View>
    </ScrollView>
  )
}

export default Settings

const customStyles = StyleSheet.create({
  scrlViewStyle: {
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  pageTitle: {
    fontWeight: "700",
    fontSize: 20,
  },
  button: {
    marginTop: 50,
  },
  label: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "800",
    fontSize: 16,
  },
  settingContainer: {
    backgroundColor: Colors.White.color,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 4,
    shadowColor: "#171717",
    marginHorizontal: 5,
    marginVertical: 7,
  },
  updateText: {
    fontWeight: "500",
    marginLeft: 10,
  },
})
