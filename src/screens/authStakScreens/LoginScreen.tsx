import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native"
import { useEffect, useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { MaterialIcons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"

import Style from "../../styles/Style"
import Colors from "../../styles/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

import { SolidButton, GoogleButton } from "../../components/components"

// ---------------------------------------------------
export default function LogInScreen({ navigation }: any) {
  const auth = getAuth()
  const [showPass, setShowPass] = useState(true)

  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  })

  function inputValidate() {
    if (value.email === "" && value.password === "") {
      setValue({ ...value, error: "Please provide your details!" })
      return false
    } else if (value.password === "") {
      setValue({ ...value, error: "Password cannot be empty!" })
      return false
    } else if (value.email === "") {
      setValue({ ...value, error: "Email cannot be empty!" })
      return false
    } else {
      return true
    }
  }

  async function handleSignIn() {
    if (!inputValidate()) return

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password)
    } catch (error: any) {
      let message =
        error.message.toLowerCase() === "firebase: error (auth/invalid-email)."
          ? "Invalid Email"
          : "Invalid Password"

      setValue({
        ...value,
        error: message,
      })

      console.debug(error.message.toLowerCase())
    }
  }

  useEffect(() => {
    console.debug(value.error)
  }, [value.error])

  //  ---------------------------------------------
  return (
    <SafeAreaView style={[Style.container]}>
      <ScrollView style={{ width: "100%" }}>
        {/* ---------------- Header Text ----------------------  */}
        <View style={[Style.headerContainer]}>
          <Image
            source={require("../../assets/images/AeroHouse.png")}
            style={{ width: 140, height: 140, marginTop: 40 }}
          />
          <Text style={[Style.headerText, [{ marginTop: 16 }]]}>Log in</Text>
        </View>

        {/* ---------------- username and password field ----------------------  */}
        <View style={[Style.inputFieldContainer, { marginBottom: "5%" }]}>
          <Text style={Style.errorMessage}>{value.error}</Text>

          <View style={Style.inputField}>
            <TextInput
              placeholder='Email Address'
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
            <MaterialIcons
              style={Style.inputFieldIcons}
              name='email'
              size={24}
            />
          </View>

          <View style={Style.inputField}>
            <TextInput
              placeholder='Password'
              secureTextEntry={showPass}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
            />
            <Entypo
              name={showPass ? "eye" : "eye-with-line"}
              size={24}
              color='black'
              style={Style.inputFieldIcons}
              onPress={() => {
                setShowPass(!showPass)
              }}
            />
          </View>
        </View>

        {/* ---------------- Login and Create accout Button----------------------  */}

        <View style={[styles.buttonContainer, { marginTop: 24 }]}>
          <SolidButton name='Login' func={handleSignIn} />

          <Text
            style={{
              textAlign: "center",
              marginVertical: 8,
              fontSize: 15,
              fontWeight: "400",
            }}>
            or
          </Text>

          <GoogleButton />
        </View>

        <View
          style={[Style.container, { marginTop: 24, flexDirection: "row" }]}>
          <Text style={[{ marginRight: 8 }]}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ color: Colors.Accent.color }}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // button container styling
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-start",
    width: "100%",
  },
  customBtn: {
    marginTop: 8,
  },
  btnText: {
    color: Colors.White.color,
  },
  //  warning field
  error: {
    borderWidth: 1,
    borderColor: "red",
  },
})
