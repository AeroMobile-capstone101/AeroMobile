
import { TouchableOpacity, Text } from "react-native"

function ButtonCircle(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      style={{
        backgroundColor: props.backgroundColor,
        height: props.height,
        aspectRatio: 1 / 1,
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: props.borderColor
      }}
    >
      <Text style={{
        color: props.textColor,
        fontFamily:'font-md'
      }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonCircle