import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native"
import { useState } from "react"

import MaterialIcon from "@expo/vector-icons/MaterialIcons"
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import Style from "../../styles/Style";
import Colors from "../../styles/Colors";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

// --------component-------
export default function SignUpScreen({ navigation }: any) {

  // getting auth to firebase
  const auth = getAuth();

  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  })

  const [confirmPass, setConfirmPass] = useState("");

  

  // handles signing to firebase asynchronously
  async function handleSignUp() {
    if (!inputValidated()) {
      return;
    }

    try{
      await createUserWithEmailAndPassword(auth, value.email, value.password );
      navigation.navigate("LogIn");

    } catch (error : any){
      setValue({
        ...value,
        error: "Unable to Connect to Server! ",
      })
    }
  }

  // handle input validation
  function inputValidated() {
    if (value.email === "" || value.password === "" || confirmPass === "") {
      setValue({ ...value, error: "Please fill up all required fields!" })
      return false;

    } else if(value.password !== confirmPass){
      setValue({...value, error: "Password did not match!"})
      return false;

   } else {
      return true
    }
  }


//------- return -----------------
  return (
    <SafeAreaView style={Style.container}>

       <View style={[Style.backBtnContainer, {justifyContent: "flex-end", marginBottom: 10}]}>

          <TouchableOpacity  onPress={() => navigation.goBack()}>
            <AntDesign name="swapleft" size={42} color="black" />
          </TouchableOpacity>

        </View>

        <View style={[Style.headerContainer, {justifyContent: "flex-end"}]}>
          <Text style={Style.headerText}>Create Account!</Text>
          <Text style={Style.pText}>Provide your details to create your account.</Text>
        </View>

      
      {/* ---------------- input field ----------------------  */}


          <View style={[Style.inputFieldContainer, {flex: 2}]}>

                <Text style={Style.errorMessage}>{value.error}</Text>

                <View style={Style.inputField}>
                  <MaterialIcon name='email' size={24} />
                  <TextInput
                    style={{ width: "88%" }}
                    placeholder='Email Address'
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                  />
                  
                </View>

                <View style={Style.inputField}>

                  <FontAwesome5 name="user-lock" size={23} color="black" />
                  <TextInput
                    style={Style.inputFieldText}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                  />
                </View>

                <View style={Style.inputField}>

                    <MaterialIcon name='lock' size={24} />
                    <TextInput
                      style={Style.inputFieldText}
                      placeholder='Confirm Password'
                      secureTextEntry={false}
                      value={confirmPass}
                      onChangeText={(value) => setConfirmPass(value)}
                    />
                </View>
          </View>

      {/* ---------------- SignUp and Create Account Button----------------------  */}

            <View style={{flex: 1.2, width: "100%"}}>
              <TouchableOpacity
                style={[Style.buttonSolid, Style.button]}
                onPress={handleSignUp}
                >
                <Text style={[Style.buttonText, {color: Colors.White.color}]}>Sign Up</Text>

              </TouchableOpacity>

              <TouchableOpacity
                style={[Style.buttonTransparent, Style.button]}
                onPress={() => navigation.navigate("LogIn")}>
                <Text style={[Style.buttonText, {color: Colors.Black.color}]}>Already have an account </Text>
              </TouchableOpacity>
            </View>

    </SafeAreaView>
  )
}



