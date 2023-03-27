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
import { AntDesign } from "@expo/vector-icons"
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
      setValue({
        ...value,
        error: error.message,
      })
      console.debug(error.message)
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
            style={{ width: 150, height: 150, marginTop: 40 }}
          />
          <Text style={[Style.headerText, [{ marginTop: 24 }]]}>Log in</Text>
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

        <View style={styles.buttonContainer}>
          <SolidButton name='Log In' func={handleSignIn} />

          <Text
            style={{
              textAlign: "center",
              marginVertical: 8,
              fontSize: 15,
              fontWeight: "700",
            }}>
            or
          </Text>

          <GoogleButton />
        </View>

        <View>
          <Text>
            Don't have an account?
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text>Register</Text>
            </TouchableOpacity>
          </Text>
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
