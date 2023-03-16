import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native"
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome"
import MaterialIcon from "@expo/vector-icons/MaterialIcons"
import { useState } from "react"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

// --------component-------
export default function SignUpScreen({ navigation }: any) {
  const auth = getAuth()

  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  })

  async function handleSignUp() {
    if (!inputValidated()) {
      return
    }

    try{
      await createUserWithEmailAndPassword(auth, value.email, value.password );
      navigation.navigate("LogIn");


    } catch (error : any){
      setValue({
        ...value,
        error: error.message,
      })
    }
  }

  function inputValidated() {
    if (value.email === "" || value.password === "") {
      setValue({ ...value, error: "Email and password cannot be empty!" })
      return false
    } else {
      return true
    }
  }

  // -------------------------------------------------------------
  return (
    <SafeAreaView>
      <View>
        <Text >Get Your Account Created</Text>
      </View>

      {/* ---------------- input field ----------------------  */}
      <View style={{ marginTop: 40 }}>
        <View>
          <TextInput
            style={{ width: "88%" }}
            placeholder='Email Address'
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <MaterialIcon name='email' size={25} />
        </View>

        <View >
          <TextInput
            style={{ width: "88%" }}
            placeholder='Password'
            secureTextEntry={true}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
          />
          <MaterialIcon name='lock' size={27} />
        </View>
      </View>

      {/* ---------------- SignUp and Create Account Button----------------------  */}

      <View >
        <TouchableOpacity
          onPress={handleSignUp}
          >
          <Text>Sign Up</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("LogIn")}>
          <Text>Already have an account </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

