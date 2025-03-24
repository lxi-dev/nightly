'use client';

import { api } from "nglty/trpc/react";
import { useEffect, useState } from "react";

export const UserProfileIcon = ({ id, src }: { id?: string; src?: string | null}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { data } = api.user.getUserImage.useQuery(
    { id: id ?? "" },
    { enabled: !!id } // Enable query only if `id` is provided
  );

  useEffect(() => {
    if (src && src !== '') {
      setImageUrl(src);
    } else if (id && data?.image) {
      setImageUrl(data.image);
    }
  }, [src, id, data]);

  if (!src && !id) {
    return (
      <div
      id="profile-image-container"
      className="h-12 w-12 bg-aurora-900 rounded-2xl"
    ></div>
    )
  }
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      id="profile-image-container"
      className="h-12 w-12 bg-aurora-900 rounded-lg"
    ></div>
  );
};