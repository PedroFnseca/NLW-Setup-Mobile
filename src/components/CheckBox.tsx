import { TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors";

interface Props extends TouchableOpacityProps{
  title: string;
  checked?: boolean;
}

export function CheckBox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked 
          ? 
          <View className="h-9 w-9 bg-green-500 rounded-lg items-center justify-center">
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
          </View>
          :
          <View className="h-9 w-9 bg-zinc-700 rounded-lg"/>
      }

      <Text className="text-white text-base ml-3">
        {title}
      </Text>
    </TouchableOpacity>
  )
}