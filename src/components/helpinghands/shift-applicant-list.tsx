'use client';
import { BentoBox } from "nglty/components/elements/box";
import { Button } from "nglty/components/ui/button";
import { useShiftScheduler } from "nglty/contexts/shift-scheduler";
import { api } from "nglty/trpc/react";
import { useEffect } from "react";
  
const ShiftApplicantsList = ({ happeningId } : { happeningId: string }) => {
  const {scheduleId} = useShiftScheduler();
  const { data: applications, isLoading, refetch } = api.schedule.getApplications.useQuery(
    { happeningId: String(happeningId), scheduleId },
    { enabled: !!scheduleId }
  );

  const respondToApplication = api.schedule.respondToApplication.useMutation();

  useEffect(() => {
    console.log('schedule changed');
    void refetch();
  }, [scheduleId])

  const handleResponse = async (applicationId: string, status: "accepted" | "declined") => {
    try {
      const rsp = await respondToApplication.mutateAsync({ applicationId, status });

      if (!rsp) console.error('error setting application');
      
    } catch (error) {
      console.error("Error updating application status:", error);
    } finally {
    }
  };

  if (isLoading || !applications) return <div>Loading applications...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Applicants for Schedule</h1>
      <div className="space-y-4">
        {applications.length === 0 ? (
          <div>No applications found for this schedule.</div>
        ) : (
          applications.map((application) => (
            <BentoBox key={application.id} className="p-4">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold">{application.user.name ?? "Unknown User"}</h2>
                    {application.message && <p className="text-gray-600 mt-2">{application.message}</p>}
                  </div>
                  <div className="mt-4 sm:mt-0 flex gap-2">
                    <Button
                      onClick={() => handleResponse(application.id, "accepted")}
                      disabled={application.status === "accepted"}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleResponse(application.id, "declined")}
                      disabled={application.status === "declined"}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Status: <span className="capitalize">{application.status}</span>
                </p>
            </BentoBox>
          ))
        )}
      </div>
    </div>
  );
};

export default ShiftApplicantsList;