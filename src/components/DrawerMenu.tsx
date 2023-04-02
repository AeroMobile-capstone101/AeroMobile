import { View, StyleSheet, Text } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { getAuth } from "firebase/auth"

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from "react-native-paper"
import Colors from "../styles/Colors"

export function DrawerMenu(props: any, logout: any) {
  const auth = getAuth()
  function handleSignOut() {
    auth.signOut().then(() => {
      console.debug("User is signed out!")
    })
  }

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

          <View style={{ marginLeft: 16 }}>
            <Title style={styles.title}>Minato Namikaze</Title>
            <Caption style={styles.caption}>@mikomako</Caption>
          </View>
        </View>

        {/* -------Body------ */}

        <Drawer.Section style={{ flex: 1, marginTop: 24 }}>
          <Drawer.Item
            label='Dashboard'
            onPress={() => {
              props.navigation.navigate("Dashboard")
            }}
          />

          <Drawer.Item
            label='AeroHouse'
            onPress={() => {
              props.navigation.navigate("AeroHouse")
            }}
          />
        </Drawer.Section>

        <Drawer.Item label='Log out' onPress={handleSignOut} />
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContent: { height: "100%" },
  userInfoSection: {
    backgroundColor: Colors.Accent.color,
    flexDirection: "row",
    alignItems: "center",
    height: 200,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomRightRadius: 48,
  },
  profile: {},
  title: {
    fontWeight: "bold",
    color: Colors.White.color,
  },
  caption: {
    fontSize: 12,
    fontWeight: "800",
    color: Colors.White.color,
  },
})
