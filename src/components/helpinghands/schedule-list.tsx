"use client";

import { useEffect } from "react";
import { Calendar, LoaderIcon, Trash2 } from "lucide-react";
import { useShiftScheduler } from "nglty/contexts/shift-scheduler";
import { api } from "nglty/trpc/react";
import { BentoBox } from "../elements/box";
import { Button } from "../ui/button";

interface ScheduleListProps {
  happeningId: string;
  owner: boolean;
}

export function ScheduleList({ happeningId, owner }: ScheduleListProps) {
  const { setScheduleData, setScheduleId } = useShiftScheduler();

  // tRPC queries and mutations
  const schedulesQuery = api.schedule.getByHappeningId.useQuery(
    { happeningId },
    { enabled: !!happeningId }
  );

  const utils = api.useContext();

  const deleteScheduleMutation = api.schedule.delete.useMutation({
    onSuccess: async () => {
      await utils.schedule.getByHappeningId.invalidate({ happeningId });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const fetchAndSetFirstSchedule = async (scheduleId: string) => {
    try {
      const scheduleResult = await utils.schedule.getById.fetch({ id: scheduleId });
      if (scheduleResult.scheduleData) {
        setScheduleId(scheduleId);
        setScheduleData(scheduleResult.scheduleData);
      }
    } catch (error) {
      console.error("Error loading the first schedule:", error);
    }
  };

  useEffect(() => {
    if (!schedulesQuery.data) return;
    if (!owner && schedulesQuery.data?.length > 0) {
      // Automatically load the first schedule for non-owners
      if (!schedulesQuery.data[0]) return;
      void fetchAndSetFirstSchedule(schedulesQuery.data[0].id);
    }
  }, [owner, schedulesQuery.data]);

  const handleLoadSchedule = async (scheduleId: string) => {
    try {
      const scheduleResult = await utils.schedule.getById.fetch({ id: scheduleId });
      if (scheduleResult.scheduleData) {
        setScheduleId(scheduleId);
        setScheduleData(scheduleResult.scheduleData);
      }
    } catch (error) {
      console.error("Error loading schedule:", error);
    }
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    if (!confirm("Are you sure you want to delete this schedule?")) {
      return;
    }
    deleteScheduleMutation.mutate({ id: scheduleId });
  };

  if (schedulesQuery.isLoading) {
    return <div className="text-center py-4">Loading schedules...</div>;
  }

  if (schedulesQuery.error) {
    return (
      <div className="text-center py-4 text-destructive">
        Error loading schedules: {schedulesQuery.error.message}
      </div>
    );
  }

  const schedules = schedulesQuery.data ?? [];

  if (schedules.length === 0) {
    return <div className="text-center py-4 text-muted-foreground">No schedules found for this happening.</div>;
  }

  if (!owner) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Saved Schedules</h3>
      {schedules.map((schedule) => (
        <BentoBox key={schedule.id} className="p-4">
          <div className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <h3>{schedule.name}</h3>
                <h5>
                  {schedule.startTime} - {schedule.endTime}
                </h5>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleLoadSchedule(schedule.id)}
                  title="Load Schedule"
                >
                  <LoaderIcon className="h-4 w-4" />
                </Button>
                {owner && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    title="Delete Schedule"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Created: {new Date(schedule.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </BentoBox>
      ))}
    </div>
  );
}