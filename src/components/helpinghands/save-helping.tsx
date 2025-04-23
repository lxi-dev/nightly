"use client"

import { useState } from "react"
import { Save } from 'lucide-react'
import TextInput from "../elements/forms/fields/text"
import { useShiftScheduler } from "nglty/contexts/shift-scheduler"
import { api } from "nglty/trpc/react"
import { Button } from "../ui/button"
import { useLoading } from "nglty/contexts/loadingContext"

interface SaveScheduleFormProps {
  happeningId: string
}

export function SaveScheduleForm({ happeningId }: SaveScheduleFormProps) {
    const { getScheduleData } = useShiftScheduler()
    // const { toast } = useToast()
    const [scheduleName, setScheduleName] = useState("")
    const { showLoading, hideLoading} = useLoading();
    
    // tRPC mutations
    const createSchedule = api.schedule.create.useMutation({
      onSuccess: () => {
        // toast({
        //   title: "Schedule saved",
        //   description: `Saved "${scheduleName}" successfully.`,
        // })
        setScheduleName("")
      },
      onError: (error) => {
        console.error(error);
        // toast({
        //   title: "Error saving schedule",
        //   description: error.message || "There was a problem saving your schedule.",
        //   variant: "destructive",
        // })
      }
    })
  
    const saveSchedule = async () => {
        showLoading();
      if (!scheduleName.trim()) {
        // toast({
        //   title: "Schedule name required",
        //   description: "Please enter a name for this schedule.",
        //   variant: "destructive",
        // })
        return
      }
  
      // Get the current schedule data
      const scheduleData = getScheduleData()
      console.log(scheduleData);
      // Save using tRPC
      createSchedule.mutate({
        happeningId,
        name: scheduleName,
        scheduleData
      })
      hideLoading();
    }

  return (
    <div className="space-y-x flex flex-row w-full items-end">
      <div className="space-y-2 w-7/8">
        <TextInput
          label='Schedule Name'
          name="schedule-name"
          placeholder="e.g., Evening Shift, Weekend Schedule"
          value={scheduleName}
          onChange={(e) => setScheduleName(e.target.value)}
        />
      </div>
      <Button onClick={saveSchedule} disabled={!scheduleName.trim()}>
      <Save className="mr-2 h-4 w-4" />
        {"Save Schedule"}
      </Button>
    </div>
  )
}