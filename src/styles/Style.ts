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
        paddingHorizontal: 16
      },
      componentContainer: {
        width:'100%', 
        alignItems: 'center' 
      },
      button: {
        width: '90%',
        paddingVertical: 18,
        alignItems: 'center',
        borderRadius: 100,
        marginVertical: 8
      },
      buttonSolid:{
        backgroundColor: accent.color,
        color: white.color
      },
      buttonTransparent: {
        backgroundColor: 'none',
        borderWidth: 2,
        borderColor: accent.color,
      },
      text: {
        fontSize: 16,
        fontWeight: 'bold'
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