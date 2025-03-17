import type { User } from "next-auth";

export type FunnelData = 
  | { type: "personalInfo"; data: PersonalInfo }
  | { type: "addressDetails"; data: AddressDetails }
  | { type: "paymentInfo"; data: PaymentInfo }
  | { type: "placeInfo"; data: PlaceInfo }
  | { type: "openingHoursInfo", data: OpeningHoursInfo}
  | { type: "userAGBInfo", data: boolean }
  | { type: "userHandleInfo" , data: Handle}
  | { type: "userProfileInfo", data: UserProfileInfo}
  | { type: "happeningBasicDetails", data: Partial<HappeningCreate>}
  | { type: "happeningTypeColor", data: Partial<HappeningCreate>}
  | { type: "happeningDateText", data: Partial<HappeningCreate>}
  | { type: "happeningSummary", data: Partial<HappeningCreate>}

export type Step<T> = {
  label: string;
  Component: React.FC<FormProps<T>>;
  initialData?: (formData: T[]) => T;
};

export type FunnelProps<T> = {
  steps: Step<T>[];
  onComplete: (data: T[]) => void;
  initialData?: T[];
  user?: User;
};

export type FormProps<T> = {
  onSubmit: (data: T) => void;
  initialData?: T;
  props?: User | undefined;
};

export type HappeningCreate = {
  type: string; // 'private' | 'placebound' | 'public'
  published: boolean;
  name: string;
  venue: string;
  color: string;
  text: string;
  dateHappening?: Date;
  createdAt: Date;
  updatedAt: Date;
  postsEnabled?: boolean; // Enables or disables posts for the event
  helpingHandsEnabled?: boolean; // Enables or disables a feature for recruiting helpers
  maxParticipants?: number; // Maximum number of participants allowed
  tags?: string[]; // Tags or categories for filtering/searching events
  coverImageUrl?: string; // URL for the cover image of the event
  externalLinks?: string[]; // Links to external resources
  isRecurring?: boolean; // Indicates if the event recurs periodically
  recurrencePattern?: string; // Details about recurrence (e.g., 'weekly', 'monthly', etc.)
  privacyLevel?: string; // 'open', 'invite-only', 'rsvp-required'
  cancellationReason?: string; // Reason for event cancellation, if applicable
  archived?: boolean; // Marks the event as archived
};

export type UserProfileInfo = {
  name?: string;
  image?: string;
  age?: string;
  location?: string;
  bio?:string;
}
export type PlaceInfo = {
    name: string;
    description?: string;
    image?: string;
}

export type PersonalInfo = {
    name: string;
    email: string;
  };

 export type Handle = {
  handle?: string;
 } 

export type AddressDetails = {
    heartplace: boolean;
    address?: string;
    city: string;
    zip?: number;
    lat?: number;
    lan?: number;
  };
  
export type PaymentInfo = {
    cardNumber: string;
    expiryDate: string;
  };

export type Hours = {
    from: string;
    to: string;
}
export type OpeningHourDay = {
    day: string;
    hours: Hours[];
}

export type OpeningHoursInfo = {
    openingHours: OpeningHourDay[];
}
  