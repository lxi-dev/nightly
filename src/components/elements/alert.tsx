'use client'
import { Compass } from "lucide-react";
import { Button } from "../ui/button";
import { useProfile } from "nglty/contexts/profileContext";

type AlertProps = {
  message?: string,
  locationEnabled?: boolean,
  onAction?: () => void,
  actionLabel?: string
}

const Alert = ({ message, locationEnabled, onAction, actionLabel = "Change" } : AlertProps) => {
  const { location } = useProfile();

  return (
    <div className="mb-6 flex items-center justify-between rounded-lg bg-gradient-to-r from-violet-50 via-fuchsia-50 to-violet-50 dark:from-violet-800 dark:via-fuchsia-500 dark:to-violet-500 p-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
          <Compass className="h-4 w-4" />
        </div>
        <div className="text-sm">
          {(locationEnabled && location)? (
            <>Exploring places near <span className="font-medium">{location.displayName.split(',')[0]}</span></>
          ) : (
            <>{message}</>
          )}
        </div>
      </div>
      {onAction && (
        <Button variant="ghost" size="sm" className="text-xs" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Alert;
