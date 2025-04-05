'use client';
import { MapPin, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useProfile } from "nglty/contexts/profileContext";

export const HappeningsActionBar = () => {

    const { location } = useProfile();
return (
    <div className="flex items-center justify-between mb-6 mt-6">
        <a href="happen/create">
        <Button className="gap-1 bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-700 transition-all duration-300 shadow-md hover:shadow-lg dark:text-white">
            <Plus className="h-4 w-4" />
            <span>Create Event</span>
        </Button>
        </a>
        <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" />
                <span>{location?.displayName}</span>
            </div>
        </div>
        </div>
        );
}