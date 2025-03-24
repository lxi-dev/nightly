import { ShiftSchedulerProvider } from "nglty/contexts/shift-scheduler"
import { ShiftScheduler } from "./Scheduler"
import { BentoBox } from "../elements/box"
import { SaveScheduleForm } from "./save-helping"
import { ScheduleList } from "./schedule-list"

export const HelpingHands = ({happeningId, owner} : {happeningId: string, owner: boolean}) => {

    return (
        <ShiftSchedulerProvider>
            <main className="container mx-auto py-8 px-4">
                <h1 className="text-3xl font-bold mb-8">Shift Scheduler</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ShiftScheduler owner={owner}/>
                    </div>
                
                    <div className="space-y-8">
                    {owner && 
                        <BentoBox className="p-4">
                        <div>
                            <h3>Save Schedule</h3>
                            <h5>Save this schedule for the happening</h5>
                        </div>
                        <div>
                            <SaveScheduleForm happeningId={happeningId} />
                        </div>
                        </BentoBox>
                                            
                                        }
                        <ScheduleList happeningId={happeningId} />
                    </div>
                </div>
            </main>
        </ShiftSchedulerProvider>
    )
}