import { StyleSheet } from "react-native"
import Colors from "./Colors"

export default StyleSheet.create({
  // big card
  cardContainer: {
    backgroundColor: Colors.White.color,
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginHorizontal: 8,
    borderRadius: 30,
  },
  cardTitle: {
    fontFamily: "font-bold",
    fontSize: 16,
  },

  //small card container
  cardContainer_sm: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    margin: 8,
    borderRadius: 30,
    backgroundColor: Colors.White.color,
    width: 150,
    height:180,
    alignItems: "flex-start",
    justifyContent: 'space-evenly',
  },
  cardContentContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  cardContentValue: {
    fontFamily: "font-bold",
    fontSize: 24,
  },
  iconContainer: {
    backgroundColor: Colors.Accent.color,
    padding: 8,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon:{
      
  },
  cardTitle_sm: {
    fontFamily: 'font-bold',
    fontSize: 16,
  },
  cardLabel_sm: {
    fontFamily: 'font-reg',
    fontSize: 13
  }
})