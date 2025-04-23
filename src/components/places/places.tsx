'use client';
import { PlaceList } from "./places-list";
import YourPlaceCard from "./your-place-card";
import { Tabs, Tab, TabContent } from "../ui/tabs";
import { GroupList } from "./group-list";
import { useProfile } from "nglty/contexts/profileContext";

type Props = {
    userId: string;
}

export const PlacesComponent: React.FC<Props> = ({ userId  }) => {
  const { user } = useProfile();
  return (
    <div className="h-full w-full gap-4">
      <Tabs defaultActiveTab="around">
        {user && 
        <Tab id="around" label="Around you">
          <TabContent>
            <PlaceList />
            </TabContent>
            </Tab>
        }
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