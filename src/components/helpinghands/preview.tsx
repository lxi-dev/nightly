"use client"

import { useShiftScheduler } from "nglty/contexts/shift-scheduler"
import { useMemo } from "react"

type ShiftsPreviewProps = {
  onShiftClick: (e: {positionId: string, shiftId: string}) => void;
}

export function ShiftsPreview({onShiftClick} : ShiftsPreviewProps) {
  const { positions, startTime, endTime, highlighted } = useShiftScheduler()

  // Convert time string to minutes since midnight
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number)
    return hours! * 60 + minutes!
  }

  // Check if the overall period is overnight
  const isOvernight = timeToMinutes(endTime) <= timeToMinutes(startTime)

  // Calculate total minutes in the shift period
  const totalMinutes = useMemo(() => {
    const startMinutes = timeToMinutes(startTime)
    const endMinutes = timeToMinutes(endTime)

    if (isOvernight) {
      // If overnight, add 24 hours (1440 minutes) to end time
      return 24 * 60 - startMinutes + endMinutes
    } else {
      return endMinutes - startMinutes
    }
  }, [startTime, endTime, isOvernight])

  // Generate time intervals for the grid (30 min intervals)
  const timeIntervals = useMemo(() => {
    const intervals = []

    // Start with the period start time
    const currentDate = new Date()
    const [startHours, startMinutes] = startTime.split(":").map(Number)
    currentDate.setHours(startHours!, startMinutes, 0, 0)

    // Calculate end time as a Date object
    const endDate = new Date()
    const [endHours, endMinutes] = endTime.split(":").map(Number)
    endDate.setHours(endHours!, endMinutes, 0, 0)

    // If end time is earlier than start time, add a day to end date
    if (isOvernight) {
      endDate.setDate(endDate.getDate() + 1)
    }

    // Track which day we're on
    let currentDay = 0
    let previousHours = startHours

    // Generate intervals until we reach the end time
    while (currentDate <= endDate) {
      // Format the current time
      const timeString = `${String(currentDate.getHours()).padStart(2, "0")}:${String(currentDate.getMinutes()).padStart(2, "0")}`

      // Check if we've crossed midnight
      if (previousHours === 23 && currentDate.getHours() === 0) {
        currentDay += 1
      }

      intervals.push({
        time: timeString,
        day: currentDay,
      })

      // Store current hours for midnight crossing detection
      previousHours = currentDate.getHours()

      // Advance 30 minutes
      currentDate.setMinutes(currentDate.getMinutes() + 30)
    }

    return intervals
  }, [startTime, endTime, isOvernight])

  // Calculate the position and width of a shift block - completely rewritten
  const calculateShiftPosition = (start: string, end: string, startDay: number, endDay: number) => {
    // Convert period start time to minutes
    const periodStartMinutes = timeToMinutes(startTime)

    // Function to convert a time to minutes since the start of the period
    const getMinutesSincePeriodStart = (time: string, day: number) => {
      const timeMinutes = timeToMinutes(time)

      // Calculate base minutes (without day offset)
      let minutesSincePeriodStart = timeMinutes - periodStartMinutes

      // If time is earlier in the day than period start, add a day
      if (minutesSincePeriodStart < 0) {
        minutesSincePeriodStart += 24 * 60
      }

      // Add day offset (full days)
      minutesSincePeriodStart += day

      return minutesSincePeriodStart
    }

    // Calculate start and end positions in minutes since period start
    const startPosition = getMinutesSincePeriodStart(start, startDay)

    // For end position, we need to handle overnight shifts specially
    let endPosition = getMinutesSincePeriodStart(end, endDay)

    // If this is an overnight shift (end day > start day), but the calculated duration is too long,
    // we need to adjust the end position
    if (endDay > startDay) {
      const calculatedDuration = endPosition - startPosition
      const directDuration = timeToMinutes(end) - timeToMinutes(start)

      // If direct duration is negative, it means we've crossed midnight
      // The correct duration should be 24 hours + direct duration
      const expectedDuration = directDuration < 0 ? 24 * 60 + directDuration : directDuration

      // If our calculated duration is significantly larger than expected, adjust it
      if (calculatedDuration > expectedDuration + 60) {
        // Add a small buffer (60 min) for rounding
        endPosition = startPosition + expectedDuration
      }
    }

    // Calculate left position and width as percentages
    const left = (startPosition / totalMinutes) * 100
    const width = ((endPosition - startPosition) / totalMinutes) * 100

    return {
      left: `${left}%`,
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
                key={`${interval.time}-${interval.day}-${index}`}
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
                    className={`absolute top-0 h-full ${ highlighted?.timeSlot.id === slot.id ? 'bg-violet-300' : 'bg-primary/80'} rounded text-xs text-primary-foreground flex items-center justify-center overflow-hidden`}
                    style={{ left, width }}
                    onClick={() => onShiftClick({positionId: position.id, shiftId: slot.id})}
                  >
                    <div className="flex items-center gap-1 px-1">
                      <span className="truncate">
                        {slot.start} - {slot.end}
                      </span>
                      {slot.startDay !== slot.endDay && (
                        <div className="bg-background/20 text-[0.6rem] h-4 px-1">
                          +{slot.endDay - slot.startDay}
                        </div>
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

