import { View, Text, TextInput, StyleSheet, TouchableOpacity} from "react-native"
import { useEffect, useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { AntDesign } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

import Style from "../../styles/Style";
import Colors from "../../styles/Colors";

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
    <View style={[Style.container, {paddingHorizontal: 32, flex:1}]}>

{/* --------------------back button styling------------------------ */}
      <View style={styles.backBtnContainer}>

        <TouchableOpacity  onPress={() => navigation.goBack()}>
           <Ionicons name="md-return-up-back" size={40} color="black" />
        </TouchableOpacity>
         
      </View>

{/* ---------------- Header Text ----------------------  */}
      <View style={[styles.headerContainer]}>
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.pText}>Please enter your details to login.</Text>
      </View>


{/* ---------------- username and password field ----------------------  */}
      <View style={styles.inputFieldContainer}>
        <View style={styles.inputField}> 
          <TextInput
            style={styles.textInput}
            placeholder='Email Address'
            value={value.email}
            onChangeText={(text) => setValue({...value, email: text})}
          />
          <AntDesign name="user" size={24} color="black" />
        </View>

        <View style={styles.inputField}>
          <TextInput
            style={styles.textInput}
            placeholder='Password'
            secureTextEntry={true}
            value={value.password}
            onChangeText={(text) => setValue({...value, password: text})}
          />
         <Ionicons name="lock-closed-outline" size={24} color="black" />
        </View>

      </View>

{/* ---------------- SignIn Button----------------------  */}

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={[Style.buttonSolid, styles.button]}
          onPress={handleSignIn}
          >
          <Text style={[Style.text, styles.btnText]}>Sign In</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  // back button styling
  backBtnContainer: {
    flex: .5, 
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end', 
  },

  // header text styling
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  headerText: {
     fontSize: 32,
     fontWeight: 'bold',
     lineHeight: 60
  },
  pText: {
    fontSize: 15
  },

  // inputField Styling
  inputFieldContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start'
  },

  inputField: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    marginBottom: 8,
    borderRadius: 8,
    
  },
  textInput: {
    width: '90%',
    fontSize: 15,
  },
  
  // button container styling
  buttonContainer:{
    flex: 1,
    justifyContent: 'flex-start',
    width: '100%',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 8,
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
