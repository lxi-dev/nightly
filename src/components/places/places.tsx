'use client';
import { PlaceList } from "./places-list";
import YourPlaceCard from "./your-place-card";
import { Tabs, Tab, TabContent } from "../ui/tabs";
import { GroupList } from "./heartplaces-list";

type Props = {
    userId: string;
}

export const PlacesComponent: React.FC<Props> = ({ userId  }) => {
  return (
    <div className="h-full w-full gap-4">
      <Tabs defaultActiveTab="around">
        <Tab id="around" label="Around you">
          <TabContent>
            <PlaceList />
  
            </TabContent>
            </Tab>
            <Tab id="heartplaces" label="Groups">
              <TabContent>
                <GroupList />
              </TabContent>
            </Tab>
            <Tab id="myplace" label="My Places">
              <TabContent>
                <YourPlaceCard userId={userId}/>
              </TabContent>
            </Tab>
          </Tabs>
    </div>
  );
}