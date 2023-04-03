import { View, SafeAreaView, Text, TextInput, Image } from "react-native"
import { useState } from "react"

import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"

import Style from "../../styles/Style"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { ScrollView } from "react-native-gesture-handler"
import SolidButton from "../../components/SolidButton"
import GoogleButton from "../../components/GoogleButton"

import { doc, setDoc, getFirestore } from "firebase/firestore"
import db from "../../config/firebase"

// import * as Linking from "expo-linking"

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

      const usersRef = doc(db, "users", userCredential.user.uid)
      await setDoc(usersRef, {
        user_params: { email: value.email, password: value.password },
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
        style={[{ width: "100%" }]}
        showsVerticalScrollIndicator={false}>
        <View style={[Style.headerContainer, { marginBottom: "0%" }]}>
          <Image
            source={require("../../assets/images/AeroHouse.png")}
            style={{ width: 140, height: 140, marginTop: 40 }}
          />
          <Text style={[Style.headerText, [{ marginTop: 16 }]]}>
            Create Account
          </Text>
          <Text style={Style.pText}>Provide your details to sign up.</Text>
        </View>

        {/* ---------------- input field ----------------------  */}

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

          <View style={Style.inputField}>
            <TextInput
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
          <SolidButton name='Sign Up' func={handleSignUp} />

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
      </ScrollView>
    </SafeAreaView>
  )
}
