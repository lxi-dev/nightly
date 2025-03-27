import { api } from 'nglty/trpc/react';
import React, { useState } from 'react';
import { Button } from '../ui/button';

interface PlaceListItemProps {
  id: string;
  name: string;
  city?: string | null;
  group: boolean;
  verified: boolean;
  createdAt: string;
  creatorId: string;
}

const PlaceListItem: React.FC<PlaceListItemProps> = ({
  id,
  name,
  city,
  group,
  verified,
  createdAt,
  creatorId,
}) => {
  const [isVerified, setIsVerified] = useState(verified);

  const toggleVerifiedMutation = api.places.toggleVerified.useMutation({
    onSuccess: (data) => {
      setIsVerified(data.verified);
    },
    onError: (error) => {
      alert(`Failed to toggle verified status: ${error.message}`);
    },
  });

  const handleToggleVerified = () => {
    toggleVerifiedMutation.mutate({ id });
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-white">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{name}</h3>
        {city && <p className="text-sm text-gray-600">City: {city}</p>}
        <p className="text-sm text-gray-600">
          Group: {group ? "Yes" : "No"}
        </p>
        <p className="text-sm text-gray-600">Created At: {new Date(createdAt).toLocaleDateString()}</p>
        <p className="text-sm text-gray-600">Creator ID: {creatorId}</p>
      </div>
      <Button 
        variant={isVerified ? "default" : "outline"} 
        onClick={handleToggleVerified}
      >
        {isVerified ? "Verified" : "Verify"}
      </Button>
    </div>
  );
};

export default PlaceListItem;