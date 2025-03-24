
"use client"
import type React from "react"
import TimeInput from "./time"

interface TimeRangePickerProps {
  startTime: string
  endTime: string
  startDay: number
  endDay: number
  positionId: string
  slotId: string
  onTimeChange: (start: string, end: string, startDay: number, endDay: number) => void
}

export function TimeRangePicker({
  startTime,
  endTime,
  startDay,
  endDay,
//   positionId,
//   slotId,
  onTimeChange,
}: TimeRangePickerProps) {
//   const { startTime: periodStart, endTime: periodEnd, isOverallPeriodOvernight } = useShiftScheduler()

  // Helper to check if time1 is before time2
  const isTimeBefore = (time1: string, time2: string): boolean => {
    const [hours1, minutes1] = time1.split(":").map(Number)
    const [hours2, minutes2] = time2.split(":").map(Number)

    if (hours1! < hours2!) return true
    if (hours1 === hours2 && minutes1! < minutes2!) return true
    return false
  }

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value

    // Keep the same day context for start
    const newStartDay = startDay

    // If end time is earlier than start time on the same day, it means end is on the next day
    let newEndDay = endDay
    if (isTimeBefore(endTime, newStart) && startDay === endDay) {
      newEndDay = startDay + 1
    } else if (!isTimeBefore(endTime, newStart) && startDay !== endDay) {
      // If end time is not earlier than start time but they're on different days,
      // bring end time to the same day as start
      newEndDay = startDay
    }

    onTimeChange(newStart, endTime, newStartDay, newEndDay)
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value

    // If end time is earlier than start time on the same day, it means end is on the next day
    let newEndDay = endDay
    if (isTimeBefore(newEnd, startTime) && startDay === endDay) {
      newEndDay = startDay + 1
    } else if (!isTimeBefore(newEnd, startTime) && startDay !== endDay) {
      // If end time is not earlier than start time but they're on different days,
      // bring end time to the same day as start
      newEndDay = startDay
    }

    onTimeChange(startTime, newEnd, startDay, newEndDay)
  }

  const getDayLabel = (day: number) => {
    if (day === 0) return "Day 1"
    if (day === 1) return "Day 2"
    if (day === 2) return "Day 3"
    return `Day ${day + 1}`
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
      <TimeInput label={'From'} name={`start-${startTime}`} value={startTime} onChange={handleStartTimeChange} />

          <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {getDayLabel(startDay)}
          </span>
      </div>
      <div className="space-y-2">
          <TimeInput label={'To'} name={`end-${endTime}`} value={endTime} onChange={handleEndTimeChange} />
          <span className="ml-1 text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            {getDayLabel(endDay)}
          </span>


      </div>
    </div>
  )
}


/*"use client"

import type React from "react"

import { useEffect, useState } from "react"
import TimeInput from "./time"

interface TimeRangePickerProps {
  startTime: string
  endTime: string
  minTime: string
  maxTime: string
  onTimeChange: (start: string, end: string, isOvernight: boolean) => void
  isOvernight?: boolean
}

export function TimeRangePicker({ startTime, endTime, minTime, maxTime, onTimeChange, isOvernight = false }: TimeRangePickerProps) {
    const [overnight, setOvernight] = useState(isOvernight)

    // Ensure times are within bounds when min/max change
  useEffect(() => {
    let newStart = startTime
    let newEnd = endTime

    if (compareTime(startTime, minTime, false) < 0) {
      newStart = minTime
    }

    if (compareTime(endTime, maxTime, overnight) > 0 && !overnight) {
      newEnd = maxTime
    }

    if (newStart !== startTime || newEnd !== endTime) {
      onTimeChange(newStart, newEnd, overnight)
    }
}, [minTime, maxTime, startTime, endTime, overnight, onTimeChange])

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value

    // Ensure start time is not before min time
    if (compareTime(newStart, minTime, false) < 0) {
      onTimeChange(minTime, endTime, overnight)
      return
    }

    // If not overnight, ensure start time is not after end time
    if (!overnight && compareTime(newStart, endTime, false) > 0) {
      onTimeChange(newStart, newStart, overnight)
      return
    }

    onTimeChange(newStart, endTime, overnight)
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value

    // If not overnight, ensure end time is not after max time
    if (!overnight && compareTime(newEnd, maxTime, false) > 0) {
      onTimeChange(startTime, maxTime, overnight)
      return
    }

    // If not overnight, ensure end time is not before start time
    if (!overnight && compareTime(newEnd, startTime, false) < 0) {
      onTimeChange(startTime, startTime, overnight)
      return
    }

    onTimeChange(startTime, newEnd, overnight)
  }

  const handleOvernightChange = (checked: boolean) => {
    setOvernight(checked)
    onTimeChange(startTime, endTime, checked)
  }

// Helper to compare times (returns negative if a < b, 0 if equal, positive if a > b)
  // If isOvernight is true and we're comparing with end time, we consider end time to be on the next day
  const compareTime = (a: string, b: string, isOvernight: boolean): number => {
    const [aHours, aMinutes] = a.split(":").map(Number)
    const [bHours, bMinutes] = b.split(":").map(Number)

    if(!aHours || !bHours || !aMinutes || !bMinutes) return 0;
    // If comparing with an overnight end time, add 24 hours to the end time
    const adjustedBHours = isOvernight ? bHours + 24 : bHours

    if (aHours !== adjustedBHours) {
      return aHours - adjustedBHours
    }
    return aMinutes - bMinutes
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
      <TimeInput label={'From'} name={`start-${startTime}`} value={startTime} onChange={handleStartTimeChange} />
      </div>
      <div className="space-y-2">
        <TimeInput label={'To'} name={`end-${endTime}`} value={endTime} onChange={handleEndTimeChange} />
      </div>
    </div>
  )
}

*/