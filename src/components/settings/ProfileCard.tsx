import { View, Text, StyleSheet } from "react-native"
import Colors from "../../styles/Colors"
import { Avatar } from "react-native-paper"

function ProfileCard() {
  return (
    <View style={customStyles.profileContainer}>
      <Avatar.Image
        size={60}
        source={require("../../assets/images/profiles/parkSeoJeon.jpg")}
      />
      <Text style={customStyles.userName}>John Marco Tito</Text>
      <Text style={customStyles.emailStyle}>johnmarco.tito@ctu.edu.ph</Text>
    </View>
  )
}

export default ProfileCard

const customStyles = StyleSheet.create({
  profileContainer: {
    backgroundColor: Colors.White.color,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",

    elevation: 4,
    shadowColor: "#171717",
    margin: 5,
  },
  userName: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.Black.color,
    marginTop: 15,
  },
  emailStyle: {
    fontWeight: "400",
    fontSize: 13,
    marginTop: 5,
  },
})
