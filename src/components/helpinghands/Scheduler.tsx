
"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { useShiftScheduler } from "nglty/contexts/shift-scheduler"
import TimeInput from "../elements/forms/fields/time"
import { BentoBox } from "../elements/box"
import TextInput from "../elements/forms/fields/text"
import { TimeRangePicker } from "../elements/forms/fields/time-range"
import { ShiftsPreview } from "./preview"


export function ShiftScheduler({owner} : {owner: boolean}) {
  const {
    startTime,
    endTime,
    positions,
    highlighted,
    setStartTime,
    setEndTime,
    addPosition,
    removePosition,
    addTimeSlot,
    updateTimeSlot,
    removeTimeSlot,
    setHighlightTimeSlot,
  } = useShiftScheduler()

  const [newPositionName, setNewPositionName] = useState("")

  const handleAddPosition = () => {
    addPosition(newPositionName)
    setNewPositionName("")
  }

  const handleShiftClick = (e: {positionId: string, shiftId: string}) => {
    const {positionId, shiftId} = e;
    console.log('posi id: '+positionId);
    console.log('shift id '+shiftId);
    setHighlightTimeSlot(positionId, shiftId);

  }

  return (
    <div className="space-y-8">
        {owner && <div>
      <BentoBox className="p-4 shadow-none mb-4">
        <div>
          <h3>Set Shift Period</h3>
          <h5>Define the overall start and end time for your shifts</h5>
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
            <TimeInput label={'Start Time'} name={`start-time`} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>
            <div className="space-y-2">
            <TimeInput label={'End Time'} name={`end-time`} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>
          </div>
        </div>
      </BentoBox>

      <BentoBox className="p-4">
        <div>
          <h3>Positions & Shifts</h3>
          <h5>Create positions and define their shift times</h5>
        </div>
        <div>
          <div className="flex items-end gap-4 mb-6">
            <div className="flex-1 space-y-2">
                <TextInput label={'Position Name'} name={'position-name'} value={newPositionName} onChange={(e) => setNewPositionName(e.target.value)} />
            </div>
            <Button onClick={handleAddPosition}>
              <Plus className="mr-2 h-4 w-4" />
              Add Position
            </Button>
          </div>

          {positions.length > 0 && (
            <div className="space-y-6">
              {positions.map((position) => (
                <div key={position.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">{position.name}</h3>
                    <Button variant="outline" size="icon" onClick={() => removePosition(position.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {position.timeSlots.map((slot) => (
                    <div key={slot.id} className="flex items-end gap-4">
                      <div className="flex-1">
                        <TimeRangePicker
                          startTime={slot.start}
                          endTime={slot.end}
                          startDay={slot.startDay}
                          endDay={slot.endDay}
                          positionId={position.id}
                          slotId={slot.id}
                          onTimeChange={(start, end, startDay, endDay) =>
                            updateTimeSlot(position.id, slot.id, start, end, startDay, endDay)
                          }
                        />
                      </div>
                      <Button variant="outline" size="icon" onClick={() => removeTimeSlot(position.id, slot.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={() => addTimeSlot(position.id)}
                    disabled={
                      position.timeSlots.length > 0 && position.timeSlots[position.timeSlots.length - 1]!.end === endTime
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Time Slot
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </BentoBox>
    </div>}

    { highlighted && 
     <p className="text-xl">{JSON.stringify(highlighted)}</p>
    }


      {positions.length > 0 && (
        <BentoBox className="p-4">
          <div>
            <h3>Shifts Preview</h3>
            <h5>Visual overview of all scheduled shifts</h5>
          </div>
          <div>
            <ShiftsPreview onShiftClick={(e: {positionId: string, shiftId: string}) => handleShiftClick(e)}/>
          </div>
        </BentoBox>
      )}
    </div>
  )
}

