"use client"

import { useState } from "react"
import { BookmarkPlus, Heart, HeartOff, Users, UserPlus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import GenericNotification from "../elements/notification-pills/generic"

interface EventActionsProps {
  owner: boolean
  followers: number
  pending: number
  isFollowing?: boolean
  isBookmarked?: boolean
  participateEnabled?: boolean
  onFollow?: () => void
  onBookmark?: () => void
  onParticipate?: () => void
}

export function HappeningActions({
  owner = false,
  followers = 128,
  pending = 12,
  isFollowing = false,
  isBookmarked = false,
  onFollow = () => {console.warn('not implemented')},
  onBookmark = () => {console.warn('not implemented')},
  participateEnabled = false,
  onParticipate = () => {console.warn('not implemented')},
}: EventActionsProps) {
  const [following, setFollowing] = useState(isFollowing)
  const [bookmarked, setBookmarked] = useState(isBookmarked)
  const [participationRequested, setParticipationRequested] = useState(false)

  const handleFollow = () => {
    setFollowing(!following)
    onFollow()
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    onBookmark()
  }

  const handleParticipate = () => {
    if(owner) return;
    setParticipationRequested(true)
    onParticipate()
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {!owner && 
            <div className="flex gap-2">
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    onClick={handleFollow}
                    variant={following ? "default" : "outline"}
                    className={`flex-1 gap-2 transition-all ${
                        following ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                        }`}
                        >
                    {following ? (
                        <HeartOff className="h-4 w-4" />
                        ) : (
                            <Heart className={`h-4 w-4 ${following ? "fill-primary-foreground" : "fill-primary"}`} />
                        )}
                    {following ? "Following" : "Follow"}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{following ? "Unfollow this event" : "Follow this event for updates"}</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                    onClick={handleBookmark}
                    variant="outline"
                    size="icon"
                    className={`transition-all ${bookmarked ? "bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-950 dark:border-amber-900 dark:text-amber-400" : ""}`}
                    >
                    <BookmarkPlus className={`h-4 w-4 ${bookmarked ? "fill-amber-500 dark:fill-amber-700" : ""}`} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{bookmarked ? "Remove bookmark" : "Bookmark this event"}</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </div>
        }
        {participateEnabled && 
        <Button
          onClick={handleParticipate}
          variant="secondary"
          className={`w-full gap-2 transition-all ${
            participationRequested
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
              : "bg-secondary text-secondary-foreground"
          }`}
          disabled={participationRequested}
        >
          <UserPlus className="h-4 w-4" />
          { owner ? 'Manage Helpers' :
           participationRequested ? "Request Sent" : "Participate as Helper"}
          
        </Button>
        }
        { !participateEnabled || owner && 
        <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">{followers}</span>
            <span>followers</span>
          </div>
          <GenericNotification text={`${pending} pending`}>
            
          </GenericNotification>
        </div>
        }
      </div>
    </div>
  )
}

