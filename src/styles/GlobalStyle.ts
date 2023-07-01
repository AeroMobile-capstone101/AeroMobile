import { StyleSheet } from "react-native"
import Colors from "./Colors"

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.AccentTransparent.color,
    paddingHorizontal: 8
  },
  componentContainer: {
    width: "100%",
    alignItems: "center",
  },
  // button global styling
  buttonDisabled: {
    display: "none",
  },

  // header text styling
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontFamily: "font-bold",
    fontSize: 30,
    lineHeight: 55,
  },
  pText: {
    fontSize: 15,
    textAlign: "center",
    fontWeight: "400",
    fontFamily: "font-reg",
  },
  // inputField Styling
  inputFieldContainer: {
    width: "100%",
    justifyContent: "flex-start",
  },
  inputField: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingVertical: 14,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 15,

    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
  },
  inputFieldText: {
    width: "90%",
    fontWeight: "600",
    fontFamily: "font-reg",
    fontSize: 15,
  },
  inputFieldIcons: {
    marginRight: 5,
    marginLeft: 5,
  },
  //error message
  errorMessage: {
    color: "red",
    fontFamily: "font-reg",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 10,
    marginBottom: 5,
  },

  elevate: {
    elevation: 4,
    shadowColor: "#171717",
    marginHorizontal: 5,
    marginVertical: 5,
  }
})
