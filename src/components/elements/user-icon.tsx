'use client';

import { api } from "nglty/trpc/react";
import { useEffect, useState } from "react";

export const UserProfileIcon = ({ id }: { id: string }) => {
 
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const { data } = api.user.getUserImage.useQuery({ id });
  
    useEffect(() => {
      if (data?.image) {
        setImageUrl(data.image);
      }
    }, [data]);
    
    return (
        <div 
        style={{backgroundImage: `url(${imageUrl})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}
        id="profile-image-container" className="h-12 w-12 bg-aurora-900 rounded-lg">
      </div>
    );
  };