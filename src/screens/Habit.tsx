import { View, ScrollView, Text } from "react-native";
import { BackButton } from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import { Progressbar } from "../components/Progressbar";
import { CheckBox } from "../components/CheckBox";

interface Params {
  date: string
}

export function Habit(){
  const route = useRoute()
  const { date } = route.params as Params

  const parseDate = dayjs(date)
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <BackButton/>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text className="mt-6 text-zinc-400 font-semibold text-base capitalize">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl mb-5">
          {dayAndMonth}
        </Text>

        <Progressbar progress={30}/>

        <View className="mt-6">
          <CheckBox
            title="Beber dois litros de agua"
            checked={false}
          />
          <CheckBox
            title="Terminar isso daqui"
            checked={false}
          />
        </View>

      </ScrollView>
    </View>
  )
}