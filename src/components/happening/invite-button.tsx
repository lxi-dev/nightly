'use client'
//import { api } from "nglty/trpc/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useLoading } from "nglty/contexts/loadingContext";
import TextInput from "../elements/forms/fields/text";

type InviteProps = {
  happeningId: string
}
export const InviteToHappeningButton: React.FC<InviteProps> = ({happeningId}) => {
  const [handle, setHandle] = useState("");
  //const [invitedList, setInvitedList] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  
  //const invite = api.happening.upsertFollow.useMutation();
  const handleSubmit = async () => {
    console.log(happeningId);
    showLoading();
    // try {
    //   const userId = 'adfasdfa';
    //   const invitee = await invite.mutateAsync({
    //     status: 'pending',
    //     happeningId: happeningId,
    //     userId: userId
    //   });
    //   const invitees = invitedList;
    //   //invitees.push(invitee);
    // } catch {

    // } 
    hideLoading();
  };

  return (
    <Dialog>
  <DialogTrigger>
    <span className="w-full px-4 py-.5 rounded-lg dark:bg-aurora border dark:border-gray-700 dark:text-gray-700 text-sm text-bold">Invite</span></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Invite User</DialogTitle>
      <DialogDescription>
      <TextInput label={"handle"} name={"handle"} value={handle} onChange={(e) => setHandle(e.target.value)} />
        <Button variant="outline" onClick={handleSubmit}>Search and Invite</Button>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  );
};