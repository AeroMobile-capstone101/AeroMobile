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

import Style from "../../styles/GlobalStyle"
import Colors from "../../styles/Colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

import { SolidButton } from "../../components/components"

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
      <ScrollView
        style={[{ width: "100%", paddingHorizontal: 24 }]}
        showsVerticalScrollIndicator={false}>
          
        {/* ---------------- Header Text ----------------------  */}
        <View style={[Style.headerContainer]}>
          <Image
            source={require("../../assets/images/AeroHouse.png")}
            style={{ width: 120, height: 120, marginTop: 50 }}
          />
          <Text style={[Style.headerText, { marginTop: 10 }]}>Log in</Text>
          <Text style={Style.pText}>Provide your details to login.</Text>
        </View>

        {/* ---------------- username and password field ----------------------  */}
        <View style={[Style.inputFieldContainer, { marginBottom: 30 }]}>
          <Text style={Style.errorMessage}>{value.error}</Text>

          <View style={Style.inputField}>
            <TextInput
              style={Style.inputFieldText}
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
              style={Style.inputFieldText}
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

        <View style={[styles.buttonContainer]}>
          <SolidButton name='Login' func={handleSignIn} />
        </View>

        <View
          style={[
            Style.container,
            { marginTop: 20, paddingBottom: 10, flexDirection: "row" },
          ]}>
          <Text style={{ marginRight: 8, fontFamily: "font-reg" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text
              style={{ color: Colors.Accent.color, fontFamily: "font-reg" }}>
              Register
            </Text>
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
