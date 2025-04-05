import { useShiftScheduler } from "nglty/contexts/shift-scheduler";
import { BentoBox } from "../elements/box";
import { ApplyToHelpingHandsButton } from "./apply-button";
import { FloatingPortal } from "nglty/contexts/portal";
import { Button } from "../ui/button";

export const ShiftSignupForm: React.FC = () => {
    const { highlighted, resetHighlightTimeSlot } = useShiftScheduler();

    const clearSelection = () => {
        resetHighlightTimeSlot();
    }

    if(!highlighted) return null;

    return (
        <FloatingPortal>
            <div className="fixed top-10 md:top-40 w-full z-[9999]">
                <BentoBox animated className="bg-white p-4 w-11/12 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between">
                        <p className="text-xl">{highlighted.positionName} from {highlighted.timeSlot.start} to {highlighted.timeSlot.end}</p>
                        <div className="flex flex-row items-center space-x-4">
                        <ApplyToHelpingHandsButton />
                        <Button onClick={clearSelection}>
                            Close
                        </Button>
                        </div>
                    </div>
                </BentoBox>
            </div>
        </FloatingPortal>
    );
}