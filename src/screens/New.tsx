import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/CheckBox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado']

export function New(){

  const [weekDays, setWeekDays] = useState<number[]>([])
  const [title, setTitle] = useState('')

  function handleToggleWeekDay(weekDayindex: number){
    if(weekDays.includes(weekDayindex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayindex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayindex])
    }
  }

  async function handleCreateHabit(){
    try{
      if(!title.trim() || weekDays.length === 0){
        Alert.alert('Ops', 'Você precisa informar um título para o hábito e selecionar pelo menos um dia da semana')
        return
      }

      // await api.post('/habits', { title, weekDays})
      setTitle('')
      setWeekDays([])

      Alert.alert('Sucesso', 'Hábito criado com sucesso')
    } catch{
      console.log('error')
      Alert.alert('Ops', 'Não foi possível criar o hábito')
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}  
      >
        <BackButton />
        
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>

        <View className="mt-5">
          <Text className="mt-6 text-white font-semibold text-base">
            Qual seu comprometimento?
          </Text>

          <TextInput
            placeholder="Ex: Ler 30 minutos por dia"
            placeholderTextColor={colors.zinc[400]}
            className="h-12 pl-4 rounded-lg mt-3 bg-zinc-700 text-white focus:border-2 focus:border-green-600"
            onChangeText={setTitle}
            value={title}
          />

          <View className="mt-5">
            <Text className="font-semibold mt-4 mb-3 text-white text-base">
              Qual a recorrência?
            </Text>
            
            {
              availableWeekDays.map((day, index) => {
                return (
                  <CheckBox 
                    title={day} 
                    key={index}
                    checked={weekDays.includes(index)}
                    onPress={() => handleToggleWeekDay(index)}
                  />
                )
              })
            }
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleCreateHabit}
            className="w-full h-14 flex-row items-center justify-center bg-green-400 rounded-xl mt-12">
            <Feather
              name="check"
              size={20}
              color={colors.white}
            />
            <Text className="font-semibold text-base text-white ml-2">
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}