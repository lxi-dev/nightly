'use client';
import { api } from "nglty/trpc/react";
import { HappeningsList } from "./happenings-list";
import { Tabs, Tab, TabContent } from "../ui/tabs";

export const HappeningsComponent: React.FC = () => {
  const { data: happenings } = api.happening.getHappeningsByUser.useQuery();
  const { data: publicHappenings} = api.happening.getAllPublic.useQuery();
  const { data: nextMonthHappenings } = api.happening.getByDate.useQuery({
    range: "1_month",
  });
  return (
    <div className="h-full w-full gap-4">
      <Tabs defaultActiveTab="upcoming">
        <Tab id="upcoming" label="Upcoming">
          <TabContent>
      <HappeningsList happenings={nextMonthHappenings}/>
  
            </TabContent>
            </Tab>
            <Tab id="public" label="Public">
              <TabContent>
                <HappeningsList happenings={publicHappenings} />
              </TabContent>
            </Tab>
            <Tab id="yours" label="My Happenings">
              <TabContent>
                <HappeningsList happenings={happenings} deletable={true}/>
              </TabContent>
            </Tab>
          </Tabs>
    </div>
  );
}