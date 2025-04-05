"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type TimeSlot = {
  id: string
  start: string
  end: string
  startDay: number // 0 = first day, 1 = second day, etc.
  endDay: number // 0 = first day, 1 = second day, etc.
  isOvernight?: boolean // Kept for backward compatibility
}

export type Position = {
  id: string
  name: string
  timeSlots: TimeSlot[]
}

export type ShiftSchedule = {
  id?: string
  startTime: string
  endTime: string
  positions: Position[]
}

export type Shift = {
  positionName: string
  timeSlot: TimeSlot
}

interface ShiftSchedulerContextType {
  // State
  startTime: string
  endTime: string
  positions: Position[]
  isOverallPeriodOvernight: boolean
  highlighted?: Shift

  // Actions
  setStartTime: (time: string) => void
  setEndTime: (time: string) => void
  addPosition: (name: string) => void
  removePosition: (positionId: string) => void
  addTimeSlot: (positionId: string) => void
  updateTimeSlot: (
    positionId: string,
    slotId: string,
    start: string,
    end: string,
    startDay: number,
    endDay: number,
  ) => void
  removeTimeSlot: (positionId: string, slotId: string) => void
  setHighlightTimeSlot: (positionId: string, slotId: string) => void
  resetHighlightTimeSlot: () => void

  // Data access for persistence
  getScheduleData: () => ShiftSchedule
  setScheduleData: (data: ShiftSchedule) => void
  setScheduleId: (id: string) => void
  scheduleId: string
}

const ShiftSchedulerContext = createContext<ShiftSchedulerContextType | undefined>(undefined)

export function ShiftSchedulerProvider({ children }: { children: ReactNode }) {
  const [startTime, setStartTime] = useState("18:00")
  const [endTime, setEndTime] = useState("23:00")
  const [positions, setPositions] = useState<Position[]>([])
  const [highlighted, setHighlighted] = useState<Shift | undefined>(undefined)
  const [scheduleId, setScheduleId] = useState<string>('');

  // Helper function to check if time1 is before time2
  const isTimeBefore = (time1: string, time2: string): boolean => {
    const [hours1, minutes1] = time1.split(":").map(Number)
    const [hours2, minutes2] = time2.split(":").map(Number)

    if (hours1! < hours2!) return true
    if (hours1 === hours2 && minutes1! < minutes2!) return true
    return false
  }

  // Determine if the overall period is overnight
  const isOverallPeriodOvernight = isTimeBefore(endTime, startTime)

  const addPosition = (name: string) => {
    if (!name.trim()) return

    setPositions([
      ...positions,
      {
        id: crypto.randomUUID(),
        name: name,
        timeSlots: [],
      },
    ])
  }

  const removePosition = (positionId: string) => {
    setPositions(positions.filter((p) => p.id !== positionId))
  }

  const addTimeSlot = (positionId: string) => {
    setPositions(
      positions.map((position) => {
        if (position.id === positionId) {
          const lastSlot = position.timeSlots[position.timeSlots.length - 1]

          // If there's no previous slot, start at the beginning of the shift period
          if (!lastSlot) {
            const newEnd = calculateEndTime(startTime, 60) // Default 1 hour shift

            // Only set to overnight if the end time is earlier than start time
            const isEndBeforeStart = isTimeBefore(newEnd, startTime)
            const endDay = isEndBeforeStart ? 1 : 0

            return {
              ...position,
              timeSlots: [
                {
                  id: crypto.randomUUID(),
                  start: startTime,
                  end: newEnd,
                  startDay: 0,
                  endDay: endDay,
                  isOvernight: endDay > 0, // Set isOvernight for backward compatibility
                },
              ],
            }
          }

          // If there is a previous slot, start at its end time
          const newStart = lastSlot.end
          const newStartDay = lastSlot.endDay

          // Calculate end time (1 hour after start by default)
          const newEnd = calculateEndTime(newStart, 60)

          // Determine if the new end crosses to the next day
          let newEndDay = newStartDay

          // If the new end time is earlier than the new start time, it means we've crossed midnight
          if (isTimeBefore(newEnd, newStart)) {
            newEndDay = newStartDay + 1
          }

          return {
            ...position,
            timeSlots: [
              ...position.timeSlots,
              {
                id: crypto.randomUUID(),
                start: newStart,
                end: newEnd,
                startDay: newStartDay,
                endDay: newEndDay,
                isOvernight: newStartDay !== newEndDay, // Set isOvernight for backward compatibility
              },
            ],
          }
        }
        return position
      }),
    )
  }

  const updateTimeSlot = (
    positionId: string,
    slotId: string,
    start: string,
    end: string,
    startDay: number,
    endDay: number,
  ) => {
    setPositions(
      positions.map((position) => {
        if (position.id === positionId) {
          return {
            ...position,
            timeSlots: position.timeSlots.map((slot) => {
              if (slot.id === slotId) {
                return {
                  ...slot,
                  start,
                  end,
                  startDay,
                  endDay,
                  // Update isOvernight for backward compatibility
                  isOvernight: startDay !== endDay,
                }
              }
              return slot
            }),
          }
        }
        return position
      }),
    )
  }

  const removeTimeSlot = (positionId: string, slotId: string) => {
    setPositions(
      positions.map((position) => {
        if (position.id === positionId) {
          return {
            ...position,
            timeSlots: position.timeSlots.filter((slot) => slot.id !== slotId),
          }
        }
        return position
      }),
    )
  }

  const setHighlightTimeSlot = (positionId: string, slotId: string) => {
    const position = positions.find((p) => p.id === positionId)
    if (!position) return;
    const timeslot = position.timeSlots.find((ts) => ts.id === slotId);
    if (!timeslot) return;
    const highlightedShift: Shift = {
      positionName: position.name,
      timeSlot: timeslot
    }
    setHighlighted(highlightedShift);
  }

  const resetHighlightTimeSlot = () => {
    setHighlighted(undefined);
  }

  const calculateEndTime = (start: string, minutesToAdd: number) => {
    const [hours, minutes] = start.split(":").map(Number)
    const date = new Date()
    date.setHours(hours!, minutes)
    date.setMinutes(date.getMinutes() + minutesToAdd)

    return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`
  }

  // Data access methods for persistence
  const getScheduleData = (): ShiftSchedule => {
    return {
      startTime,
      endTime,
      positions,
    }
  }

  const setScheduleData = (data: ShiftSchedule) => {
    setStartTime(data.startTime)
    setEndTime(data.endTime)

    // Handle backward compatibility for positions and time slots
    setPositions(
      data.positions.map((position) => ({
        ...position,
        timeSlots: position.timeSlots.map((slot) => {
          // For backward compatibility with old data format
          if (!slot.startDay || !slot.endDay) {
            // Use the isOvernight property if available, otherwise detect it
            const isOvernightShift =
              slot.isOvernight ?? isTimeBefore(slot.end, slot.start)

            return {
              ...slot,
              startDay: 0,
              endDay: isOvernightShift ? 1 : 0,
              isOvernight: isOvernightShift,
            }
          }

          // Make sure isOvernight is consistent with startDay and endDay
          return {
            ...slot,
            isOvernight: slot.startDay !== slot.endDay,
          }
        }),
      })),
    )
  }

  return (
    <ShiftSchedulerContext.Provider
      value={{
        startTime,
        endTime,
        positions,
        highlighted,
        isOverallPeriodOvernight,
        setStartTime,
        setEndTime,
        addPosition,
        removePosition,
        addTimeSlot,
        updateTimeSlot,
        removeTimeSlot,
        getScheduleData,
        setScheduleData,
        setHighlightTimeSlot,
        resetHighlightTimeSlot,
        setScheduleId,
        scheduleId
      }}
    >
      {children}
    </ShiftSchedulerContext.Provider>
  )
}

export function useShiftScheduler() {
  const context = useContext(ShiftSchedulerContext)
  if (context === undefined) {
    throw new Error("useShiftScheduler must be used within a ShiftSchedulerProvider")
  }
  return context
}

