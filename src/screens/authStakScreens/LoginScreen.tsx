import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native"
import { useEffect, useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Foundation } from '@expo/vector-icons'; 

import Style from "../../styles/Style";
import Colors from "../../styles/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

// ---------------------------------------------------
export default function LogInScreen({ navigation }: any) {
 
   const auth = getAuth()
   let flag = false;

   const [value, setValue] = useState({
      email: '',
      password: '',
      error: ''
    })

    function inputValidate(){
      if (value.email === '' && value.password === ''){
          setValue({...value, error: 'Please provide your details!'})
          return false;
        }
      else if (value.password === ''){
          setValue({...value, error: 'Password cannot be empty!'})
          return false;
      }
      else if (value.email === ''){
          setValue({...value, error: 'Email cannot be empty!'})
          return false;
      }
      else{
        return true;
      }
    }
  
    async function handleSignIn() {

      if (!inputValidate()) return;

      try {
        await signInWithEmailAndPassword(auth, value.email, value.password);
      } catch (error:any) {
        setValue({
          ...value,
          error: error.message,
        })
        console.debug(error.message);
      }
    }

    useEffect(() => {
      console.debug(value.error);
    }, [value.error])
  
//  ---------------------------------------------
  return (
    <SafeAreaView style={[Style.container]}>

      <View style={Style.backBtnContainer}>

        <TouchableOpacity  onPress={() => navigation.goBack()}>
           <AntDesign name="swapleft" size={42} color="black" />
        </TouchableOpacity>
         
      </View>

{/* ---------------- Header Text ----------------------  */}
      <View style={[Style.headerContainer]}>
        <Text style={Style.headerText}>Welcome Back!</Text>
        <Text style={Style.pText}>Please provide your details to login.</Text>
      </View>


{/* ---------------- username and password field ----------------------  */}
      <View style={Style.inputFieldContainer}>
        <View style={Style.inputField}> 

          <MaterialIcons style={Style.inputFieldIcons} name="email" size={24} />
          <TextInput
            style={Style.inputFieldText}
            placeholder='Email Address'
            value={value.email}
            onChangeText={(text) => setValue({...value, email: text})}
          />
        </View>

        <View style={Style.inputField}>
              <Foundation name="lock" size={24}  style={Style.inputFieldIcons}/>
              <TextInput
                style={Style.inputFieldText}
                placeholder='Password'
                secureTextEntry={true}
                value={value.password}
                onChangeText={(text) => setValue({...value, password: text})}
              />
            </View>
      </View>

{/* ---------------- Login and Create accout Button----------------------  */}

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={[Style.buttonSolid, Style.button, styles.customBtn]}
          onPress={handleSignIn}
          >
          <Text style={[Style.buttonText, styles.btnText]}>Sign In</Text>
        </TouchableOpacity>

      
        <TouchableOpacity
          style={[Style.buttonTransparent, Style.button]}
          onPress={() => navigation.navigate("SignUp")}
          >
          <Text style={[Style.buttonText, {color: Colors.Black.color}]}>Create an account</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  // button container styling
  buttonContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  customBtn: {
    marginTop: 8
  },
  btnText: {
    color: Colors.White.color,
  },

  //  warning field 
  error: {
    borderWidth: 1,
    borderColor: 'red'
  }
})
