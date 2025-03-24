'use client'
import { api } from "nglty/trpc/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface ApplyToPlaceButtonProps {
  placeId: string;
}

export const ApplyToPlaceButton: React.FC<ApplyToPlaceButtonProps> = ({ placeId }) => {
  const [message, setMessage] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [loading, setLoading] = useState(false);

  const applyToPlace = api.places.applyToPlace.useMutation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await applyToPlace.mutateAsync({ placeId, message });
      setIsApplied(true);
    } catch (error) {
      console.error("Error applying to place:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isApplied) {
    return <p className="text-green-600">Application submitted successfully!</p>;
  }

  return (
    <Dialog>
  <DialogTrigger>Participate</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Apply to this Place?</DialogTitle>
      <DialogDescription>
      <div className="space-y-2">
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md"
        placeholder="Write a message to the owner (optional)..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
      />
        <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : "Apply to Place"}
        </Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  );
};