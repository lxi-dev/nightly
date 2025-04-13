"use client"

import { useState } from "react"
import { BookmarkPlus, Heart, HeartOff, Users, HeartHandshake } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Button } from "../ui/button"
import { redirect } from "next/navigation"

interface EventActionsProps {
  happeningId: string
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
  happeningId = '',
  owner = false,
  followers = 128,
  pending = 12,
  isFollowing = false,
  isBookmarked = false,
  onFollow = () => {console.warn('not implemented')},
  onBookmark = () => {console.warn('not implemented')},
  participateEnabled = false,
}: EventActionsProps) {
  const [following, setFollowing] = useState(isFollowing)
  const [bookmarked, setBookmarked] = useState(isBookmarked)

  const handleFollow = () => {
    setFollowing(!following)
    onFollow()
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    onBookmark()
  }

  const navigateToParticipate = () => {
    if (!owner) return;
    redirect(`${happeningId}/helpers`)
  }

  return (
    <div>
      <div className="flex flex-row md:flex-col gap-4 items-center justify-between md:justify-around">
        <div className="flex flex-row gap-2">
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
          {(participateEnabled) && 
          <div>
            <TooltipProvider>
                <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="destructive" className="flex flex-row items-center text-xs" onClick={navigateToParticipate}>
                    <HeartHandshake className="text-aurora-300"/>
                  </Button>
          </TooltipTrigger>
                <TooltipContent>
                    <p>This happening is looking for helpers!</p>
                </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            </div>
        }
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground gap-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">{followers}</span>
            <span>followers</span>
          </div>
          {owner &&           
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">{pending}</span>
            <span>pending</span>
          </div>}
        </div>
        
      </div>
    </div>
  )
}

