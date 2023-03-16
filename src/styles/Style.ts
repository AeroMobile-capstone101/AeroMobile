import { StyleSheet } from 'react-native';
import Colors from './Colors';

const accent = Colors.Accent;
const black = Colors.Black;
const white = Colors.White;

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
        backgroundColor: accent.color,
        color: white.color
      },
      buttonTransparent: {
        backgroundColor: 'none',
        color: "black",
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold'
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
});