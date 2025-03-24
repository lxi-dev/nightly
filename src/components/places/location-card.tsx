import React from "react";
import { BentoBox } from "../elements/box";
import type { JsonValue } from "@prisma/client/runtime/library";

interface VenueDetailsProps {
  address: string;
  openingHours: JsonValue;
}

const VenueDetails: React.FC<VenueDetailsProps> = ({ address, openingHours }) => {
  return (
    <BentoBox className="p-4">
      <div className="pb-2">
        <h3 className="text-base">Venue Details</h3>
      </div>
      <div className="space-y-4 pt-0">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
          <p className="text-sm">{address}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Opening Hours</h3>
          <div className="text-sm">
          {Object.entries(openingHours as Record<string, string>).map(([day, hours], index) => (
            <div key={index} className="flex justify-between">
                <span>{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                <span>{hours}</span>
            </div>
            ))}
            {/* {openingHours && openingHours.map((entry, index) => (
              <div key={index} className="flex justify-between">
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </div>
            ))} */}
          </div>
        </div>
      </div>
    </BentoBox>
  );
};

export default VenueDetails;

// Example usage
/*
const Example = () => {
  const address = "Am Tiefer 5, Bremen, 28199";
  const openingHours = [
    { day: "Friday", hours: "23:45-08:00" },
    { day: "Saturday", hours: "23:45-08:00" },
  ];

  return <VenueDetails address={address} openingHours={openingHours} />;
};

export default Example;
*/