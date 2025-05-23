import { ShiftSchedulerProvider } from "nglty/contexts/shift-scheduler"
import { ShiftScheduler } from "./Scheduler"
import { BentoBox } from "../elements/box"
import { SaveScheduleForm } from "./save-helping"
import { ScheduleList } from "./schedule-list"
import { HelpingHand } from "lucide-react"
import ShiftApplicantsList from "./shift-applicant-list"

export const HelpingHandsPage = ({happeningId} : {happeningId: string}) => {

    return (
        <ShiftSchedulerProvider>
            <main className="container mx-auto min-h-screen">
                <div className="flex flex-row p-4 align-baseline">
                    <HelpingHand />
                    <h2 className="ml-4 text-black dark:text-white text-2xl flex flex-row"> Helping Hands</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <ShiftScheduler owner={true}/>
                    <BentoBox className="p-4">
                        <div className="flex flex-row w-full">
                            <SaveScheduleForm happeningId={happeningId} />

                        </div>
                        </BentoBox>
                    </div>
                
                    <div className={`space-y-8`}> 
                        
                        <ScheduleList happeningId={happeningId} owner={true}/>
                        <ShiftApplicantsList happeningId={happeningId} />
                    </div>
                </div>
            </main>
        </ShiftSchedulerProvider>
    )
}