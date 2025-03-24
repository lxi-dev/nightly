"use client"

import { useMemo } from "react"
import { useShiftScheduler } from "nglty/contexts/shift-scheduler"
import GenericNotification from "../elements/notification-pills/generic"

export function ShiftsPreview() {
  const { positions, startTime, endTime, isOverallPeriodOvernight } = useShiftScheduler()

  // Generate time intervals for the grid (30 min intervals)
  const timeIntervals = useMemo(() => {
    const intervals = []
    const [startHour, startMinute] = startTime.split(":").map(Number)
    const [endHour, endMinute] = endTime.split(":").map(Number)

    const currentDate = new Date()
    currentDate.setHours(startHour!, startMinute, 0, 0)

    const endDate = new Date()
    endDate.setHours(endHour!, endMinute, 0, 0)

    // Handle case where end time is on the next day
    if (endDate < currentDate) {
      endDate.setDate(endDate.getDate() + 1)
    }

    while (currentDate <= endDate) {
      intervals.push({
        time: `${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`,
        day: currentDate < endDate && currentDate.getDay() !== endDate.getDay() ? 0 : 1,
      })
      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    return intervals
  }, [startTime, endTime])

  // Convert time string to minutes since midnight for calculations
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours! * 60 + minutes!
  }

  // Calculate the position and width of a shift block
  const calculateShiftPosition = (start: string, end: string, startDay: number, endDay: number) => {
    const startMinutes = timeToMinutes(start) + startDay * 24 * 60
    const endMinutes = timeToMinutes(end) + endDay * 24 * 60
    const startOfDayMinutes = timeToMinutes(startTime)

    // Calculate total minutes in the shift period
    let totalMinutes
    if (isOverallPeriodOvernight) {
      totalMinutes = 24 * 60 - startOfDayMinutes + timeToMinutes(endTime)
    } else {
      totalMinutes = timeToMinutes(endTime) - startOfDayMinutes
    }

    const shiftDuration = endMinutes - startMinutes
    const startOffset = ((startMinutes - startOfDayMinutes) / totalMinutes) * 100
    const width = (shiftDuration / totalMinutes) * 100

    return {
      left: `${startOffset}%`,
      width: `${width}%`,
    }
  }

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Time header */}
        <div className="flex border-b mb-4">
          <div className="w-[150px] flex-shrink-0 font-medium">Position</div>
          <div className="flex-1 flex">
            {timeIntervals.map((interval, index) => (
              <div
                key={`${interval.time}-${interval.day}`}
                className={`flex-1 text-center text-sm ${index % 2 === 0 ? "font-medium" : "text-muted-foreground"}`}
              >
                {interval.time}
                {interval.day > 0 && <span className="text-xs text-muted-foreground ml-1">+{interval.day}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Position rows */}
        {positions.map((position) => (
          <div key={position.id} className="flex mb-6">
            <div className="w-[150px] flex-shrink-0 font-medium py-2">{position.name}</div>
            <div className="flex-1 relative h-10 bg-muted/30 rounded">
              {position.timeSlots.map((slot) => {
                const { left, width } = calculateShiftPosition(slot.start, slot.end, slot.startDay, slot.endDay)
                return (
                  <div
                    key={slot.id}
                    className="absolute top-0 h-full bg-primary/80 rounded text-xs text-primary-foreground flex items-center justify-center overflow-hidden"
                    style={{ left, width }}
                  >
                    <div className="flex items-center gap-1 px-1">
                      <span className="truncate">
                        {slot.start} - {slot.end}
                      </span>
                      {slot.startDay !== slot.endDay && (
                        <GenericNotification text={(+(slot.endDay - slot.startDay)).toString(10)} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

