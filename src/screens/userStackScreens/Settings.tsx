import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native"
import { signOut, updateProfile, sendEmailVerification, sendPasswordResetEmail, updateEmail } from "firebase/auth"
import Colors from "../../styles/Colors"
import { MaterialIcons, SimpleLineIcons, AntDesign } from "@expo/vector-icons"
import { Avatar, Snackbar } from "react-native-paper"
import { auth } from "../../config/firebase"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { RootState } from "../../redux/app/store"
import DefaultModal from "../../components/Modal/DefaultModal"
import { setSnack } from "../../redux/features/snackbarSlice"


const Settings = () => {

  //redux
  const dispatch = useDispatch();
  const snack = useSelector((state: RootState) => state.snackbar);

 // firebase (db, auth, and etc.)
  let currentUser = auth.currentUser; 
  if(currentUser === null){
    return
  }

  const userID = currentUser.uid;  // user unique ID

  // state
  const [nameModal, setNameModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const buttons = [
    { title: 'Change display name', iconName: 'person-add', onPress: () => setNameModal(true) },
    { title: 'Change Email', iconName: 'email', onPress: () => setEmailModal(true) },
    { title: 'Send Password Reset to Email', iconName: 'lock', onPress: () => sendPasswordResetToEmail(currentUser) },
    { title: 'Logout', iconName: 'logout', onPress: () => signOut(auth) },
  ]

  // hooks
  useEffect(() => {
    currentUser = auth.currentUser;
    setLoading(false);
  }, [loading])


  // functions
  function handleNameUpdate(name: string) {
    if (currentUser === null) {
      return
    }
    updateProfile(currentUser, {
      displayName: name
    })
      .then(() => {
        dispatch(setSnack({
          isShown: true,
          message: 'Profile Changed'
        }))
      })
      .catch((e) => {
        dispatch(setSnack({
          isShown: true,
          message: e.message
        }))
      })
  }
  function handleEmailUpdate(email: string) {


    if (auth.currentUser === null) {
      return
    }
    if (email.length <= 0) {
      setError('Field cannot be empty...');
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError('Invalid Email...');
      return
    }

    updateEmail(auth.currentUser, email)
      .then(() => {
        console.log('Email Updated!');

        setEmailModal(false);
      })
      .catch((e) => {
        setError(e.message)
      })



  }
  function sendPasswordResetToEmail(user: any) {
    if (user === null) {
      return
    }
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        dispatch(setSnack({
          isShown: true,
          message: 'Password reset sent to email...'
        }))
      })
      .catch((e) => {
        dispatch(setSnack({
          isShown: true,
          message: e.message
        }))
      })

  }
  function handleRefresh() {
    setLoading(true)
  }

  // return jsx
  return (
    <View style={{
      height: '100%'
    }}>
      <ScrollView style={{
        width: "100%",
        paddingTop: 50,
        paddingHorizontal: 10
      }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
      >
        <Text style={{
          fontSize: 24,
          letterSpacing: 0.5,
          fontWeight: '800',
        }}> Settings </Text>

        {
          renderProfile()
        }

        <View style={{
          marginTop: 20
        }}>
          {
            buttons.map((button) => <RenderButtons key={button.title} onPress={button.onPress} title={button.title} iconName={button.iconName} />)
          }
        </View>
      </ScrollView>

      <DefaultModal
        visible={nameModal}
        title={'Update Display Name'}
        setVisible={() => { setError(''); setNameModal(false) }}
        inputText={'Enter new display name: '}
        buttonTitle={'Update'}
        onClick={(name: string) => handleNameUpdate(name)}
        error={error}
      />

      <DefaultModal
        visible={emailModal}
        title={'Update Email'}
        setVisible={() => { setError(''); setEmailModal(false) }}
        inputText={'Enter new email address: '}
        buttonTitle={'Update'}
        onClick={(name: string) => handleEmailUpdate(name)}
        error={error}
      />


      <Snackbar
        duration={1500}
        visible={snack.isShown}
        onDismiss={() => dispatch(setSnack({ ...snack, isShown: false }))}>
        <Text style={{ textAlign: "center", color: Colors.White.color }}>
          {snack.message}
        </Text>
      </Snackbar>

    </View>
  )

  function renderProfile() {
    return (
      <View style={{
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 20
      }}>
        <Avatar.Image
          size={60}
          source={require("../../assets/images/profiles/parkSeoJeon.jpg")}
        />
        <View style={{
          marginLeft: 15
        }}>

          <Text style={{
            fontWeight: '800',
            fontSize: 15
          }}>{currentUser?.displayName}</Text>

          <Text style={{
            fontSize: 13,
            marginVertical: 1
          }}>{currentUser?.email} {
              currentUser?.emailVerified
                ? <AntDesign name={'checkcircle'} size={12} color={Colors.Accent.color} />
                : <AntDesign name={"closecircle"} size={12} color={'red'} />
            }
          </Text>

          {
            currentUser?.emailVerified
              ? ''
              : <TouchableOpacity
                onPress={() => {
                  if (currentUser === null) {
                    return
                  }
                  sendEmailVerification(currentUser)
                    .then(() => {
                      console.log('Email Verification sent!');

                    })
                }}
              >
                <Text style={{
                  fontSize: 12,
                  color: Colors.Accent.color
                }}>Verify Email</Text>
              </TouchableOpacity>
          }


        </View>

      </View>
    )
  }

}


export function RenderButtons(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Colors.White.color,
          borderRadius: 15,
          paddingHorizontal: 10,
          paddingVertical: 20,
          marginTop: 5
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <MaterialIcons name={props.iconName} size={25} />
          <Text style={customStyles.updateText}>{props.title}</Text>
        </View>

        <SimpleLineIcons name='arrow-right' size={16} />
      </View>
    </TouchableOpacity>
  )
}

export default Settings

const customStyles = StyleSheet.create({
  pageTitle: {
    fontWeight: "700",
    fontSize: 20,
  },
  label: {
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "800",
    fontSize: 16,
  },
  settingContainer: {
    backgroundColor: Colors.White.color,
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 4,
    shadowColor: "#171717",
    marginHorizontal: 5,
    marginVertical: 7,
  },
  updateText: {
    fontWeight: "500",
    marginLeft: 10,
  },
})
