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
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}>
        <Text style={styles.headText}>Get Your Account Created</Text>
      </View>

      {/* ---------------- input field ----------------------  */}
      <View style={{ marginTop: 40 }}>
        {/* <View style={styles.inputField}>
          <TextInput
            style={{ width: "88%" }}
            placeholder='Complete Name'
            value={name}
            onChangeText={() => setValue(value.email)}
          />
          <FontAwesomeIcon name='user' size={25} />
        </View> */}

        <View style={styles.inputField}>
          <TextInput
            style={{ width: "88%" }}
            placeholder='Email Address'
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <MaterialIcon name='email' size={25} />
        </View>

        <View style={styles.inputField}>
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

      <View style={{ marginTop: 30 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            width: 310,
            padding: 12,
            backgroundColor: "#83CB13",
            borderRadius: 5,
          }}
          onPress={handleSignUp}
          >
          <Text style={styles.btnFont}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("LogIn")}>
          <Text style={styles.btnFont}>Already have an account </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 25,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 310,
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 10,
  },
  headText: {
    fontSize: 30,
  },
  signUpCont: {
    flexDirection: "row",
  },
  btn: {
    alignItems: "center",
    width: 310,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  btnFont: {
    fontSize: 16,
  },
})
