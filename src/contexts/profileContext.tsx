'use client';
import type { GeoCoordinate, User } from "@prisma/client";
import { api } from "nglty/trpc/react";
import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  location: GeoCoordinate | null;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<GeoCoordinate | null>(null);
  const { data } = api.user.getMyProfile.useQuery();

  useEffect(() => {
    // Fetch user profile from API or session here
    if(!data) return;
    setUser(data.profile);
    
    setLocation(data.profile.geoCoordinate)
  }, [data]);

  return (
    <UserContext.Provider value={{ user, setUser, location }}>
      {children}
    </UserContext.Provider>
  );
};