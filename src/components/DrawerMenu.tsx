import { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { getAuth } from "firebase/auth"

import { Avatar, Title, Caption, Drawer } from "react-native-paper"

import Colors from "../styles/Colors"

export function DrawerMenu(props: any, logout: any) {
  const auth = getAuth()

  function handleSignOut() {
    auth.signOut().then(() => {
      console.debug("User is signed out!")
    })
  }
  const { state } = props

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, paddingBottom: 16 }}>
      <View style={styles.drawerContent}>
        {/* ---- Header---- */}
        <View style={[styles.userInfoSection]}>
          <View style={styles.profile}>
            <Avatar.Image
              source={require("../assets/images/profiles/minatoProfile.jpg")}
            />
          </View>

          <View style={{ marginLeft: 16, justifyContent: "center" }}>
            <Title style={styles.name}>Minato Namikaze</Title>
            <Caption style={styles.email}>miko@gmail.com</Caption>
          </View>
        </View>

        {/* -------Body------ */}

        <Drawer.Section style={{ flex: 1, marginTop: 24 }}>
          <DrawerItem
            style={styles.drawerItemContainer}
            label='Dashboard'
            labelStyle={{ fontWeight: "800", color: "black", fontSize: 13 }}
            activeBackgroundColor={Colors.AccentTransparent.color}
            focused={state.index === 0 ? true : false}
            onPress={() => {
              props.navigation.navigate("Dashboard")
            }}
          />

          <DrawerItem
            style={styles.drawerItemContainer}
            label='AeroHouse'
            labelStyle={{ fontWeight: "800", color: "black", fontSize: 13 }}
            activeBackgroundColor={Colors.AccentTransparent.color}
            focused={state.index === 1 ? true : false}
            onPress={() => {
              props.navigation.navigate("AeroHouse")
            }}
          />
        </Drawer.Section>

        <DrawerItem
          style={styles.drawerItemContainer}
          label='Log out'
          labelStyle={{ fontWeight: "800", color: "red", fontSize: 13 }}
          onPress={handleSignOut}
        />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContent: { height: "100%" },
  userInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  profile: {},
  name: {
    fontWeight: "900",
    fontSize: 16,
  },
  email: {
    fontSize: 12,
    fontWeight: "400",
  },

  //drawerItem Styling
  drawerItemContainer: {
    paddingHorizontal: 16,
  },
  lblTextStyle: {
    fontWeight: "800",
    color: "black",
    fontSize: 13,
  },
})
