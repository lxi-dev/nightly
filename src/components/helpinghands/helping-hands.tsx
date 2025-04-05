import { ShiftSchedulerProvider } from "nglty/contexts/shift-scheduler"
import { ShiftScheduler } from "./Scheduler"
import { ScheduleList } from "./schedule-list"
import { AppWindow, HeartHandshake } from "lucide-react"
import Link from "next/link"
import { ShiftSignupForm } from "./shift-signup"

export const HelpingHands = ({happeningId, owner} : {happeningId: string, owner: boolean}) => {

    return (
        <ShiftSchedulerProvider>
            <main className="container mx-auto">
                <div className="flex flex-row p-4 align-baseline justify-between">
                    <div className="flex flex-row space-x-2 align-center items-center">
                    <HeartHandshake />
                    <h2 className="ml-4 text-black dark:text-white text-2xl flex flex-row"> Helping Hands</h2>
                    </div>
                    {owner && 
                    <Link href={`/happen/h/${happeningId}/helpers`}>
                        <div className="flex flex-row space-x-2 gap-2 align-center items-center ">
                        Settings <AppWindow /> 
                        </div>
                        </Link>
                    }
                </div>
                <ShiftSignupForm />
                <ScheduleList happeningId={happeningId} owner={false}/>
                <ShiftScheduler owner={false}/>
            </main>
        </ShiftSchedulerProvider>
    )
}