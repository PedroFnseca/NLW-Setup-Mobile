import { View, ScrollView, Text, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import clsx from "clsx";
import { Progressbar } from "../components/Progressbar";
import { CheckBox } from "../components/CheckBox";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../lib/axios";
import { generateProgressPercentage } from '../utils/generate-progress-percentage'
import { HabitsEmpty } from "../components/HabitsEmpty";

interface Params {
  date: string
}

interface DayInfoProps {
  completedHabits: string[]
  possibleHabits: {
    id: string
    title: string
  }[]
}

export function Habit(){
  const route = useRoute()
  const { date } = route.params as Params

  const parseDate = dayjs(date)
  const isDateInPast = parseDate.endOf('day').isBefore(new Date())
  const dayOfWeek = parseDate.format('dddd')
  const dayAndMonth = parseDate.format('DD/MM')

  const [loading, setLoading] = useState(false)
  const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
  const [completedHabits, setCompletedHabits] = useState<String[]>([])

  const habitsProgess = dayInfo?.possibleHabits.length 
    ? generateProgressPercentage(completedHabits.length, dayInfo.possibleHabits.length) 
    : 0

  async function fetchHabits(){
    try{
      setLoading(true)

      const response = await api.get('/day', { params: { date}})
      setDayInfo(response.data)
      setCompletedHabits(response.data.completedHabits)
    } catch (error) {
      console.log(error)
      Alert.alert('Ops, Não foi possivel carregar os hábitos do dia')
    } finally {
      setLoading(false)
    }
  }

  async function handleToggleHabit(habitId: string){
    try{
      await api.patch(`/habits/${habitId}/toggle`)

      if(completedHabits.includes(habitId)){
        setCompletedHabits(prevState => prevState.filter(item => item !== habitId))
      } else {
        setCompletedHabits(prevState => [...prevState, habitId])
      }   
    } catch (error) {
      console.log(error)
      Alert.alert('Ops, Não foi possivel atualizar o hábito')
    }
  }

  useEffect(() => {
    fetchHabits()
  }, [])

  if(loading) {
    return (
      <Loading />
    )
  }

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

        <Progressbar progress={habitsProgess}/>

        <View className={clsx("mt-10", {
          'opacity-70': isDateInPast
        })}>
          { 
            dayInfo?.possibleHabits.length ?
              dayInfo?.possibleHabits.map(habit => (
                  <CheckBox              
                    key={habit.id}
                    title={habit.title}
                    checked={completedHabits.includes(habit.id)}
                    onPress={() => handleToggleHabit(habit.id)}
                    disabled={isDateInPast}
                  />
              )) 
            : <HabitsEmpty />
          }
        </View>
          {
            isDateInPast && dayInfo?.possibleHabits.length ? (
              <Text className="text-white mt-10 text-center">
                Você mais editar hábitos de uma data passada
              </Text>
            ) : null
          }
      </ScrollView>
    </View>
  )
}