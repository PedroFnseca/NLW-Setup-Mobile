import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimuinSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimuinSummaryDatesSizes - datesFromYearStart.length
 
export function Home(){

  const { navigate } = useNavigation()

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-1 bg-transparent">
        {weekDays.map((day, index) => (
          <Text
            key={index}
            className="text-zinc-100 font-bold text-xl text-center m-1 border border-zinc-900 bg-zinc-900 rounded-lg"
            style={{width: DAY_SIZE, lineHeight: DAY_SIZE}}
          >
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
        {
          datesFromYearStart.map((date) => (
            <HabitDay
              onPress={() => navigate('habit', { date: date.toISOString()})}
              key={date.toISOString()}
              />
          ))
        }
  
        {
          amountOfDaysToFill > 0 && Array
            .from({length: amountOfDaysToFill})
            .map((_, index) => (
              <View
                key={index}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{
                  width: DAY_SIZE,
                  height: DAY_SIZE,
                }}
                />
            ))
        }
        </View>
      </ScrollView>
    </View>
  )
}