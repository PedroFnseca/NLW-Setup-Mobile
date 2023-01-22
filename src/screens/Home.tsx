import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Alert } from "react-native";
import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'
import { api } from "../lib/axios"
import { useState, useEffect } from 'react'
import { Loading } from "../components/Loading";
import dayjs from "dayjs";

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

      // const response = await api.get('/summary')
      setSummary([
        {
          "id": "ac1b7c41-f2a3-4861-a2b2-5ca04eb1d70b",
          "date": "2023-01-02T03:00:00.000Z",
          "completed": 1,
          "amount": 1
        },
        {
          "id": "c9e1e073-129b-4d31-bfdb-8fa4267a3093",
          "date": "2023-01-04T03:00:00.000Z",
          "completed": 2,
          "amount": 2
        },
        {
          "id": "ab5f65f7-13dd-4cf8-a6ed-428fde753181",
          "date": "2023-01-06T03:00:00.000Z",
          "completed": 1,
          "amount": 1
        },
        {
          "id": "d22e4930-0ec2-426a-a304-ab2c50c33252",
          "date": "2023-01-21T03:00:00.000Z",
          "completed": 0,
          "amount": 2
        }
      ])

    } catch (error) {
      console.log(error)
      Alert.alert('Ops, Não foi possivel carregar o sumário de datas')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(isLoading) {
    return (
      <Loading />
    )
  }

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
       {
        summary && 
         <View className="flex-row flex-wrap">
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
         </View>
       }
      </ScrollView>
    </View>
  )
}