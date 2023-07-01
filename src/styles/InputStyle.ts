import { StyleSheet } from "react-native"

export default  StyleSheet.create({
    modalContainerStyle: {
      backgroundColor: "white",
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    modalTitle: {
      fontWeight: "900",
      fontSize: 24,
      marginBottom: 10,
    },
    modalLabel: {
      fontWeight: "700",
      marginBottom: 5,
      fontSize: 13,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 10,
      paddingHorizontal: 15,
      padding: 10,
      marginBottom: 15,
    },
    inputText: {
      fontSize: 16,
    },
    error: {
      color: 'red',
      fontFamily: 'font-reg',
      marginVertical: 10
    }
  })