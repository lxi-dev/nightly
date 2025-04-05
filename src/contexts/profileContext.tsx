'use client';
import type { GeoCoordinate, User } from "@prisma/client";
import { api } from "nglty/trpc/react";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useRef
} from "react";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  location: GeoCoordinate | null;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useProfile must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [location, setLocation] = useState<GeoCoordinate | null>(null);
  const hasFetched = useRef(false);

  const { refetch } = api.user.getMyProfile.useQuery(undefined, {
    enabled: false, // Disable automatic query on mount
  });

  const fetchUserProfile = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const result = await refetch();
    if (result.data) {
      const profile = result.data.profile;
      setUser(profile);
      setLocation(profile.geoCoordinate);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = () => {
    hasFetched.current = false;
    void fetchUserProfile();
  };

  return (
    <UserContext.Provider value={{ user, setUser, location, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};