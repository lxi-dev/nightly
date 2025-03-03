export type FunnelData = 
  | { type: "personalInfo"; data: PersonalInfo }
  | { type: "addressDetails"; data: AddressDetails }
  | { type: "paymentInfo"; data: PaymentInfo }
  | { type: "placeInfo"; data: PlaceInfo }
  | { type: "openingHoursInfo", data: OpeningHoursInfo};

export type Step<T> = {
  label: string;
  Component: React.FC<FormProps<T>>;
};

export type FunnelProps<T> = {
  steps: Step<T>[];
  onComplete: (data: T[]) => void;
  initialData?: T[];
};

export type FormProps<T> = {
  onSubmit: (data: T) => void;
};

export type PlaceInfo = {
    name: string;
    description?: string;
    image?: string;
}

export type PersonalInfo = {
    name: string;
    email: string;
  };

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
  