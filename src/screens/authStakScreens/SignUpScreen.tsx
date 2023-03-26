import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Image

} from "react-native"
import { useState } from "react"

import MaterialIcon from "@expo/vector-icons/MaterialIcons"
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

import Style from "../../styles/Style";
import Colors from "../../styles/Colors";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { ScrollView } from "react-native-gesture-handler";

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

      <ScrollView style={[{width: "100%" }]} showsVerticalScrollIndicator={false}>

       <View style={[Style.backBtnContainer, {justifyContent: "flex-end", marginBottom: "0%", marginTop: "10%"}]}>

          <TouchableOpacity  onPress={() => navigation.goBack()}>
            <AntDesign name="swapleft" size={42} color="black" />
          </TouchableOpacity>

        </View>

        <View style={[Style.headerContainer, {marginBottom: "0%"}]}>
          <Image
              source={require("../../assets/images/greenLogo.png")}
              style={{width: 220, height: 180}}
          />
          <Text style={Style.headerText}>Create Account!</Text>
          <Text style={Style.pText}>Provide your details to sign up.</Text>
        </View>

      
      {/* ---------------- input field ----------------------  */}


          <View style={[Style.inputFieldContainer, {marginBottom: "5%"}]}>

                <Text style={Style.errorMessage}>{value.error}</Text>

                <View style={Style.inputField}>
                  <MaterialIcon style={Style.inputFieldIcons}  name='email' size={24} />
                  <TextInput
                    style={{ width: "88%" }}
                    placeholder='Email Address'
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                  />
                  
                </View>

                <View style={Style.inputField}>

                  <View style={[{}]}>
                     <FontAwesome5 style={Style.inputFieldIcons} name="user-lock" size={20} color="black" />
                  </View>

                  <TextInput
                    style={Style.inputFieldText}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                  />
                </View>

                <View style={Style.inputField}>

                    <AntDesign style={Style.inputFieldIcons} name="checkcircle" size={24} color="black" />
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

          </ScrollView>
    </SafeAreaView>
  )
}



