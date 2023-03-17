import { StyleSheet } from 'react-native';
import Colors from './Colors';


export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32
      },
      componentContainer: {
        width:'100%', 
        alignItems: 'center' 
      },
      button: {
        width: '100%',
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 100,
      },
      buttonSolid:{
        backgroundColor: Colors.Accent.color,
        color: Colors.White.color
      },
      buttonTransparent: {
        backgroundColor: 'none',
        color: "black",
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
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
        fontSize: 12,
        textAlign: "center",
        fontWeight: "600"
       },

         // back button styling
      backBtnContainer: {
        flex: .5, 
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center', 
      },

      // inputField Styling
      inputFieldContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start'
      },
      inputField: {
        alignItems: "center",
        flexDirection: 'row',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: "#fff",
        marginBottom: 8,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "black"
      },
      inputFieldText: {
        width: '90%',
        fontSize: 16,
      },
      inputFieldIcons: {
        marginRight: 8,
        marginLeft: 8
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
        paddingVertical: 16
      }
});