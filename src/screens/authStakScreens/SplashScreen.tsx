import React, { useState } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet, BackHandler} from "react-native"
import Style from "../../styles/Style"
import Colors from "../../styles/Colors"


const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={[styles.compContainer]}>

        <View style={[styles.bgContainer , {flex: 5}]}>
          <Image
              source={require("../../assets/images/onBoardLogo.png")}
              style={styles.bgStyle}
            />
        </View>
          
        <View style={[styles.mainHeader, {flex: 2.5}]}>
            <Text style={styles.headerText}>AeroMobile</Text>
            <Text style={styles.pText}>Easily Manage your system, </Text>
            <Text style={styles.pText}>all in one app! </Text>
        </View>

        <View style={[styles.btnContainer, {flex: 1}]}>
                <TouchableOpacity
                  style={[Style.button, {backgroundColor: Colors.White.color}]}
                  onPress={() => navigation.navigate("LogIn")}>
                  <Text style={[Style.text, Colors.Black]}>Get Started</Text>
                </TouchableOpacity>
        </View>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  compContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Accent.color
  },
  btnContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: "flex-start"
  },
  mainHeader: {
    paddingTop: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.White.color,
    marginBottom: 10,
    letterSpacing: 1
  },
  pText: {
    fontSize: 15,
    color: Colors.White.color,
    fontWeight: "600",
    letterSpacing: 1.1,
  },
  bgContainer: {
    width: "100%",
  },
  bgStyle:{
    marginTop: "10%",
    resizeMode: "stretch",
    paddingTop: 100,
    
  }
  
})