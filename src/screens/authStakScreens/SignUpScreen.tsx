import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native"
import { useState } from "react"

import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"

import Style from "../../styles/GlobalStyle"
import Colors from "../../styles/Colors"

import { ScrollView } from "react-native-gesture-handler"
import SolidButton from "../../components/SolidButton"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../../config/firebase"


// --------component-------
export default function SignUpScreen({ navigation }: any) {
  // getting auth to firebase
  const auth = getAuth()

  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  })

  const [showPass, setShowPass] = useState(true)
  const [confirmPass, setConfirmPass] = useState("")

  let month = new Date().getMonth() + 1
  let day = new Date().getDay()
  let year = new Date().getFullYear()

  // handles signing to firebase asynchronously
  async function handleSignUp() {
    if (!inputValidated()) {
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      )

      const usersRef = doc(db, "users_collection", userCredential.user.uid)
      await setDoc(usersRef, {
        systems: [],
        user_params: {
          email: value.email,
          password: value.password,
          firstname: "update firstname",
          lastname: "update lastname",
          created_at: `${month}-${day}-${year}`,
        },
      })


    } catch (error: any) {
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  // handle input validation
  function inputValidated() {
    if (value.email === "" || value.password === "" || confirmPass === "") {
      setValue({ ...value, error: "Please fill up all required fields!" })
      return false
    } else if (value.password !== confirmPass) {
      setValue({ ...value, error: "Password did not match!" })
      return false
    } else {
      return true
    }
  }

  //------- return -----------------
  return (
    <SafeAreaView style={Style.container}>
      <ScrollView
        style={{ width: "100%", paddingHorizontal: 24 }}
        showsVerticalScrollIndicator={false}>
        <View style={[Style.headerContainer]}>
          <Image
            source={require("../../assets/images/AeroHouse.png")}
            style={{ width: 120, height: 120, marginTop: 50 }}
          />
          <Text style={[Style.headerText, [{ marginTop: 8 }]]}>
            Create Account
          </Text>
          <Text style={Style.pText}>Provide your details to sign up.</Text>
        </View>

        {/* ---------------- input field ----------------------  */}

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

          <View style={Style.inputField}>
            <TextInput
              style={Style.inputFieldText}
              placeholder='Confirm Password'
              secureTextEntry={false}
              value={confirmPass}
              onChangeText={(value) => setConfirmPass(value)}
            />

            <AntDesign
              style={Style.inputFieldIcons}
              name='checkcircle'
              size={24}
              color='black'
            />
          </View>
        </View>

        {/* ---------------- SignUp and Create Account Button----------------------  */}

        <View style={{ flex: 1.2, width: "100%" }}>
          <SolidButton name='Sign Up' onPress={handleSignUp} />
          <View
            style={[
              Style.container,
              { marginTop: 24, paddingBottom: 24, flexDirection: "row" },
            ]}>
            <Text style={[{ marginRight: 8, fontFamily: "font-reg" }]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
              <Text
                style={{
                  color: Colors.Accent.color,
                  fontFamily: "font-reg",
                }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
