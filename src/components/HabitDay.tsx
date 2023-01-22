import { TouchableOpacity, TouchableOpacityProps, Dimensions } from "react-native";
import { generateProgressPercentage } from "../utils/generate-progress-percentage";
import clsx from "clsx";
import dayjs from "dayjs";

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps {
  amount?: number
  completed?: number
  date: Date
}

export function HabitDay({amount = 0, completed = 0, date, ...rest}: Props){

  const AmountCompletedpercentage = amount > 0 ? generateProgressPercentage(completed, amount) : 0
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = dayjs(date).isSame(today)

  return(
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        "bg-zinc-900 border-zinc-800": AmountCompletedpercentage === 0,
        "bg-violet-900 border-violet-700": AmountCompletedpercentage > 0 && AmountCompletedpercentage < 20,
        "bg-violet-800 border-violet-600": AmountCompletedpercentage >= 20 && AmountCompletedpercentage < 40,
        "bg-violet-700 border-violet-500": AmountCompletedpercentage >= 40 && AmountCompletedpercentage < 60,
        "bg-violet-600 border-violet-400": AmountCompletedpercentage >= 60 && AmountCompletedpercentage < 80,
        "bg-violet-500 border-violet-300": AmountCompletedpercentage >= 80 && AmountCompletedpercentage < 100,
        "bg-violet-400 border-violet-200": AmountCompletedpercentage === 100,
        "border-white border-4": isCurrentDay,
      })}
      activeOpacity={0.7}
      style={{
        width: DAY_SIZE,
        height: DAY_SIZE,
      }}
      {...rest}
    />
  )
}