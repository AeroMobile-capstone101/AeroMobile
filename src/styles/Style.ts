import { StyleSheet } from "react-native"
import Colors from "./Colors"

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  componentContainer: {
    width: "100%",
    alignItems: "center",
  },
  // button global styling
  buttonDisabled: {
    display: "none",
  },
  button: {
    width: "100%",
    paddingVertical: 18,
    alignItems: "center",
    borderRadius: 10,
  },
  buttonSolid: {
    backgroundColor: Colors.Accent.color,
    color: Colors.White.color,
  },
  buttonTransparent: {
    backgroundColor: "none",
    color: "black",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
  },

  // header text styling
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 64,
  },
  pText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "600",
  },

  // back button styling
  backBtnContainer: {
    flex: 0.5,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
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
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    marginBottom: 10,

    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  inputFieldText: {
    width: "90%",
    fontSize: 16,
  },
  inputFieldIcons: {
    marginRight: 8,
    marginLeft: 8,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 45,
    height: 90,
  },

  //error message

  errorMessage: {
    color: "red",
    textAlign: "center",
    paddingVertical: 16,
  },
})
