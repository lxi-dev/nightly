'use client'
import { api } from "nglty/trpc/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useShiftScheduler } from "nglty/contexts/shift-scheduler";
import { useLoading } from "nglty/contexts/loadingContext";


export const ApplyToHelpingHandsButton: React.FC = () => {
  const [message, setMessage] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const { highlighted, scheduleId } = useShiftScheduler();

    const applyToShift = api.schedule.applyToShift.useMutation();
  const handleSubmit = async () => {
    showLoading();
    try {
        const timeslotId = highlighted?.timeSlot.id;
        if (!timeslotId) return;
        await applyToShift.mutateAsync({ scheduleId, timeslotId, message });
      setIsApplied(true);
    } catch (error) {
      console.error("Error applying to place:", error);
    } finally {
      hideLoading();
    }
  };

  if (isApplied) {
    return <p className="text-green-600">Application submitted successfully!</p>;
  }

  return (
    <Dialog>
  <DialogTrigger>
    <span className="outline">Participate</span></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Apply to this Shift?</DialogTitle>
    </DialogHeader>
      <DialogDescription>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Write a message to the owner (optional)..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
      />
        <Button variant="outline" onClick={handleSubmit}>Apply</Button>

      </DialogDescription>
  </DialogContent>
</Dialog>

  );
};