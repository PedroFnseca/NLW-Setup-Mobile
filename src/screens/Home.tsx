import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { api } from "../lib/axios"
import { useState, useCallback } from 'react'
import { Loading } from "../components/Loading";
import dayjs from "dayjs";
import Animated, { FadeIn } from "react-native-reanimated";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginning()
const minimuinSummaryDatesSizes = 18 * 5
const amountOfDaysToFill = minimuinSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = Array<{
  id: string
  date: string
  amount: number
  completed: number
}>

export function Home(){
  const [isLoading, setIsLoading] = useState(false) // Alterar depois para true
  const [summary, setSummary] = useState<SummaryProps | null>()

  const { navigate } = useNavigation()

  async function fetchData(){
    try{
      setIsLoading(true)

      const response = await api.get('/summary')
      setSummary(response.data)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops, Não foi possivel carregar o sumário de datas')
    } finally {
      setIsLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData()
  }, []))

  if(isLoading) {
    return (
      <Loading />
    )
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <Animated.View 
        className="flex-row mt-6 mb-1 bg-transparent"
        entering={FadeIn}
      >
        {weekDays.map((day, index) => (
          <Text
            key={index}
            className="text-zinc-100 font-bold text-xl text-center m-1 border border-zinc-900 bg-zinc-900 rounded-lg"
            style={{width: DAY_SIZE, lineHeight: DAY_SIZE}}
          >
            {day}
          </Text>
        ))}
      </Animated.View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
       {
        summary && 
         <Animated.View 
          className="flex-row flex-wrap"
          entering={FadeIn}  
        >
         {
           datesFromYearStart.map((date) => {
           const dayWhithHabit = summary.find(day => {
             return dayjs(date).isSame(day.date, 'day')
           })
 
           return (
               <HabitDay
                  date={date}
                  amount={dayWhithHabit?.amount}
                  completed={dayWhithHabit?.completed}       
                  onPress={() => navigate('habit', { date: date.toISOString()})}
                  key={date.toISOString()}
               />
           )})
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
         </Animated.View>
       }
      </ScrollView>
    </View>
  )
}