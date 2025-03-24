
"use client"
import type React from "react"
import TimeInput from "./time"
import { useEffect } from "react"

interface TimeRangePickerProps {
  startTime: string
  endTime: string
  startDay: number
  endDay: number
  positionId: string
  slotId: string
  onTimeChange: (start: string, end: string, startDay: number, endDay: number) => void
}

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
    onTimeChange,
  }: TimeRangePickerProps) {
    //const { startTime: periodStart, endTime: periodEnd } = useShiftScheduler()
  
  // Helper to check if time1 is before time2
  const isTimeBefore = (time1: string, time2: string): boolean => {
    const [hours1, minutes1] = time1.split(":").map(Number)
    const [hours2, minutes2] = time2.split(":").map(Number)

    if (hours1! < hours2!) return true
    if (hours1 === hours2 && minutes1! < minutes2!) return true
    return false
  }

  // Helper to check if a time is midnight (00:00)
  const isMidnight = (time: string): boolean => time === "00:00"

  // Validate and fix day settings on mount
  useEffect(() => {
    let newStartDay = startDay
    let newEndDay = endDay
    let needsUpdate = false

    // Special handling for midnight
    if (isMidnight(startTime) && startDay === 0 && endDay > 0) {
      // If start is midnight on day 0 but end is on a later day,
      // start should also be on day 1
      newStartDay = 1
      needsUpdate = true
    }

    // Only fix end day if it's before start time (indicating overnight)
    // But not if start is midnight (special case)
    if (isTimeBefore(endTime, startTime) && startDay === endDay && !isMidnight(startTime)) {
      newEndDay = startDay + 1
      needsUpdate = true
    }

    if (needsUpdate) {
      onTimeChange(startTime, endTime, newStartDay, newEndDay)
    }
  }, [startTime, endTime, startDay, endDay, onTimeChange])

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value

    // Keep the same day for start
    let newStartDay = startDay

    // Special handling for midnight
    if (isMidnight(newStart) && endDay > 0) {
      // If new start is midnight and end is on a later day,
      // start should be on day 1
      newStartDay = 1
    }

    // Ensure end day is consistent with start day
    let newEndDay = endDay

    // If end time is earlier than start time on the same day, move end to next day
    // But not if start is midnight (special case)
    if (isTimeBefore(endTime, newStart) && newStartDay === endDay && !isMidnight(newStart)) {
      newEndDay = newStartDay + 1
    }
    // If end time is not earlier than start time but they're on different days,
    // bring end time to the same day as start (unless it's a legitimate overnight shift)
    else if (!isTimeBefore(endTime, newStart) && newStartDay !== endDay && !isMidnight(newStart)) {
      newEndDay = newStartDay
    }

    onTimeChange(newStart, endTime, newStartDay, newEndDay)
  }

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value

    // Keep the same day for end initially
    let newEndDay = endDay

    // Special handling for midnight
    if (isMidnight(newEnd)) {
      // If new end is midnight, it should be on the next day
      newEndDay = startDay + 1
    }
    // If end time is earlier than start time on the same day, it means end is on the next day
    // But not if start is midnight (special case)
    else if (isTimeBefore(newEnd, startTime) && startDay === endDay && !isMidnight(startTime)) {
      newEndDay = startDay + 1
    }
    // If end time is not earlier than start time but they're on different days,
    // bring end time to the same day as start
    else if (!isTimeBefore(newEnd, startTime) && startDay !== endDay && !isMidnight(startTime)) {
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