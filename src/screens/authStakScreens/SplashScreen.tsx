import React, { useCallback, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  BackHandler,
} from "react-native"
import Style from "../../styles/Style"
import Colors from "../../styles/Colors"
import SolidButton from "../../components/SolidButton"
import { WhiteButton } from "../../components/components"

const SplashScreen = ({ navigation }: any) => {
  const [fontLoaded, setFontLoaded] = useState(false)

  return (
    <View style={[styles.compContainer, Style.container]}>
      <View style={[styles.bgContainer, { flex: 5 }]}>
        <Image
          source={require("../../assets/images/onBoardLogo.png")}
          style={styles.bgStyle}
        />
      </View>

      <View style={[styles.mainHeader, { flex: 2.9 }]}>
        <Text style={styles.headerText}>AeroMobile</Text>
        <Text style={styles.pText}>Easily Manage your system, </Text>
        <Text style={styles.pText}>all in one app! </Text>
      </View>

      <View style={[styles.btnContainer, { flex: 1.5 }]}>
        <WhiteButton name='Log In' func={() => navigation.navigate("LogIn")} />
        <SolidButton
          name='Sign Up'
          func={() => navigation.navigate("SignUp")}
        />
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  compContainer: {
    backgroundColor: Colors.Accent.color,
  },
  btnContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mainHeader: {
    paddingTop: 40,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  headerText: {
    fontSize: 36,
    fontWeight: "900",
    color: Colors.White.color,
    marginBottom: 10,
    letterSpacing: 1,
  },
  pText: {
    fontSize: 15,
    color: Colors.White.color,
    fontWeight: "600",
    letterSpacing: 1.1,
  },
  bgContainer: {
    width: "100%",
    alignItems: "center",
  },
  bgStyle: {
    width: "140%",
    height: "90%",
    marginTop: "10%",
    resizeMode: "stretch",
  },
})
