'use client';

import React, { useEffect, useState } from "react";
import { Funnel } from "../funnel";
import type { FormProps, FunnelData, HappeningCreate, Step } from "nglty/models/funnel";

import { motion } from "framer-motion";
import { MdOutlinePublic } from "react-icons/md";
import { HomeModernIcon } from "@heroicons/react/24/outline";
import { EyeClosedIcon } from "lucide-react";
import { api } from "nglty/trpc/react";
import type { Place } from "@prisma/client";
import { useLoading } from "nglty/contexts/loadingContext";
import TextInput from "../fields/text";
import NumberInput from "../fields/number";
import DropdownInput from "../fields/dropdown";
import DateInput from "../fields/date-picker";
import TextAreaInput from "../fields/text-area";
import CSVInput from "../fields/csv";
import ToggleInput from "../fields/toggle";
import { redirect } from "next/navigation";

type CheckboxHeartHouseProps = {
  name: string;
  value?: string;
  onChange?: (value: 'public' | 'placebound' | 'private') => void;
  overwrite?: { value: string, locked: boolean}
};

const TripleCheckbox: React.FC<CheckboxHeartHouseProps> = ({ name, value = 'public', onChange, overwrite }) => {
  const [checked, setChecked] = useState<string>(value);
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleClick = () => {
    if(disabled) return;
    const nextValue = checked === 'public' ? 'placebound' : checked === 'placebound' ? 'private' : 'public';
    setChecked(nextValue);
    if (onChange) onChange(nextValue);
  };

  const notifyLock = () => {
    // to something!
  }

  useEffect(() => {
    if(overwrite?.value) {
        setChecked(overwrite.value);
        setDisabled(true);
    }
  }, [overwrite])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
          className={`p-4 ${disabled? 'border-2 border-gray-300' : 'bg-white'} rounded-2xl shadow-lg cursor-pointer`}
          whileHover={!disabled ? { scale: 1.1 } : {}}
          whileTap={!disabled ? { scale: 0.9 } : {}}
          onClick={!disabled ? handleClick : notifyLock}
      >
        {checked === 'public' ? (
          <motion.div
            key="public"
            initial={{ scale: 0, rotate: -45, color: "#60a5fa" }}
            animate={{ scale: 1, rotate: 0, color: "#3b82f6" }}
            exit={{ scale: 0, rotate: 45, color: "#60a5fa" }}
            transition={{ duration: 0.3 }}
          >
            <MdOutlinePublic className="text-blue-500 w-12 h-12" />
          </motion.div>
        ) : checked === 'placebound' ? (
          <motion.div
            key="placebound"
            initial={{ scale: 0, rotate: -45, color: "#fbbf24" }}
            animate={{ scale: 1, rotate: 0, color: "#f59e0b" }}
            exit={{ scale: 0, rotate: 45, color: "#fbbf24" }}
            transition={{ duration: 0.3 }}
          >
            <HomeModernIcon className="text-yellow-500 w-12 h-12" />
          </motion.div>
        ) : (
          <motion.div
            key="private"
            initial={{ scale: 0, rotate: 45, color: "#f87171" }}
            animate={{ scale: 1, rotate: 0, color: "#ef4444" }}
            exit={{ scale: 0, rotate: -45, color: "#f87171" }}
            transition={{ duration: 0.3 }}
          >
            <EyeClosedIcon className="text-red-500 w-12 h-12" />
          </motion.div>
        )}
      </motion.div>
      <input type="checkbox" name={name} value={checked} hidden readOnly />
    </div>
  );
};

// 1. Basic Details Form
export const BasicDetailsForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState({
        type: "private",
        name: "",
        venue: "",
        maxParticipants: 0,
      });
    const [place, setPlace] = useState<Place | undefined>(undefined);
    const { showLoading, hideLoading } = useLoading();
    const [queryParams, setQueryParams] = useState<Record<string, string> | null>(null);
    const { data: places } = api.places.getPlaces.useQuery(
        { id: queryParams?.place },
        {
        enabled: !!queryParams, // Ensures the query runs only if id is defined
        }
    );


  useEffect(() => {
    showLoading();
    // Access the query string from the URL
    const searchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};

    // Loop through the parameters and store them in the params object
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    if (!params?.place) {
        hideLoading();
        return;
    }
    // Set the query params to the state
    setQueryParams(params);
  }, []);

  useEffect(() => {
    if(!places) return;
    if (places) {
        const place = places[0];
        console.log(place);
        if(!place) return;
        setPlace(place);
        setData((prev) => ({...prev, "venue": place.name})); 
    }
    hideLoading();

  }, [places]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "maxParticipants" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type: "happeningBasicDetails", data });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <TripleCheckbox
          name="type"
          value={data.type}
          onChange={(type) => setData((prev) => ({ ...prev, type }))}
          overwrite={ place ? {value: 'placebound', locked: true} : undefined}
        />
        <p>Choose if the event is private, venue-bound, or public.</p>
      </div>
      <div>
        <TextInput 
          label="Name" name="name" value={data.name} onChange={handleChange} required/>
      </div>
      {data.type !== "public" && (
        <div>
          <TextInput
            label="Venue"
            name="venue"
            value={data.venue || ""}
            onChange={handleChange}
            required
            disabled={place && true} />
        </div>
      )}
      <div>
        <NumberInput 
          label="Max Participants"
          name="maxParticipants"
          value={data.maxParticipants}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export const TypeColorForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<Partial<HappeningCreate>>({
      color: "aurora-900",
      tags: [],
      coverImageUrl: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "happeningTypeColor", data });
    };

    const colorOptions = [
      { value: 'aurora', label: 'Black' },
      { value: 'red', label: 'aurora-900' },
      { value: 'green', label: 'aurora-400' },
    ];
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput
            label="Cover Image URL"
            name="coverImageUrl"
            value={data.coverImageUrl!}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextInput
            label="Tags (comma-separated)"
            name="tags"
            value={data.tags ? data.tags.join(",") : ''}
            onChange={(e) =>
              setData((prev) => ({ ...prev, tags: e.target.value.split(",") }))
            }
          />
        </div>
        <div>
          <DropdownInput
            label="Color"
            name="color"
            value={data.color!}
            onChange={handleChange}
            options={colorOptions}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </form>
    );
  };
  export const DateTextForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<Partial<HappeningCreate>>({
      dateHappening: new Date(),
      text: "",
      externalLinks: [],
      isRecurring: false,
      recurrencePattern: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "happeningDateText", data });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Date of Happening</label>
          <DateInput
            label="Date of Happening"
            name="dateHappening"
            value={data.dateHappening!.toISOString().split("T")[0]!}
            onChange={(e) =>
              setData((prev) => ({
                ...prev,
                dateHappening: new Date(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <TextAreaInput
            label="description"
            name="text"
            value={data.text!}
            onChange={handleChange}  
            />   
        </div>
        <div>
          <CSVInput
          label="Links (comma-separated)"
          name="externalLinks"
          value={data.externalLinks!.join(",")}
          onChange={(e) =>
            setData((prev) => ({ ...prev, externalLinks: e.split(",") }))
          } />
        </div>
        <div>
          <ToggleInput
            label="Recurring Event"
            name="isRecurring"
            value={data.isRecurring!}
            onChange={(e) => setData((prev) => ({...prev, isRecurring: e}))}
          /> {/* isOn={data.isRecurring} onToggle={toggleRecurring} /> */}
        </div>
        {data.isRecurring && (
          <div>
            <TextInput 
              label="Recurrence Pattern"
              name="recurrencePattern"
              value={data.recurrencePattern ?? ""}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Next
        </button>
      </form>
    );
  };
  
// 4. Summary and Submission
export const SummaryForm: React.FC<FormProps<FunnelData>> = ({ onSubmit, initialData }) => {
    const [data, setData] = useState<Partial<HappeningCreate>>({
        helpingHandsEnabled: false,
        postsEnabled: true,
        privacyLevel: 'open',
      });
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({ type: "happeningSummary", data });
  };

  const privacyOptions = [
    { value: 'open', label: 'public'},
    { value: 'invite-only', label: 'Invite Only'},
    { value: 'rsvp-req', label: 'Reserveration required'}
  ]

  return (
    <div className="space-y-4">
      <h3>Review Your Happening</h3>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(initialData, null, 2)}</pre>
    <div className="flex flex-row items-start align-center">
      <ToggleInput 
        label="Enable Posts for this Event" name="postsEnabled" value={data.postsEnabled!} onChange={(e) =>setData((prev) => ({...prev, postsEnabled:e}))}      
      /> 
    </div>
    <div className="flex flex-row items-start align-center">
      <ToggleInput 
        label="Enable Helping Hands for this Event"
        name="helpingHandsEnabled"
        value={data.helpingHandsEnabled!}
        onChange={(e) => setData((prev) => ({...prev, helpingHandsEnabled: e}))}
        /> 
    </div>
    <div>
      <DropdownInput label="Privacy" name="privacyLevel" value={data.privacyLevel!} options={privacyOptions} onChange={(e) => setData((prev) => ({...prev, privacyLevel: e.target.value}))} />

      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

// Main Funnel Example
const HappeningFunnel = () => {
  const {showLoading, hideLoading} = useLoading();
  const steps: Step<FunnelData>[] = [
    { label: "Basic Details", Component: BasicDetailsForm },
    { label: "Type & Color", Component: TypeColorForm },
    { label: "Date & Text", Component: DateTextForm },
    { label: "Summary", Component: SummaryForm },
  ];

  const createHappening = api.happening.createHappening.useMutation({
    onSuccess: async () => {
      console.log("mutation");
    },
  });

  const handleComplete = async (data: FunnelData[]) => {
    const [generalInfoEntry, typeColorEntry, dateTextEntry, configEntry] = data.map(item => item?.data);
    const generalInfoData = generalInfoEntry as Partial<HappeningCreate>;
    const typeColorData = typeColorEntry as Partial<HappeningCreate>;
    const dateTextData = dateTextEntry as Partial<HappeningCreate>;
    const configData = configEntry as Partial<HappeningCreate>;

    if(!generalInfoData || !typeColorData || !dateTextData || !configData) return;

    const commonPayload: HappeningCreate = {
      type: generalInfoData.type!,
      published: false,
      name: generalInfoData.name!,
      venue: generalInfoData.venue!,
      color: typeColorData.color!,
      text: dateTextData.text!,
      createdAt: new Date(),
      updatedAt: new Date(),
      dateHappening: dateTextData.dateHappening ?? undefined,
      postsEnabled: configData.postsEnabled!,
      helpingHandsEnabled: configData.helpingHandsEnabled!,
      maxParticipants: generalInfoData.maxParticipants ?? undefined,
      tags: typeColorData.tags ?? [],
      coverImageUrl: typeColorData.coverImageUrl ?? undefined,
      externalLinks: typeColorData.externalLinks ?? [],
      isRecurring: dateTextData.isRecurring!,
      recurrencePattern: dateTextData.recurrencePattern ?? undefined,
      privacyLevel: configData.privacyLevel!,
      cancellationReason: undefined,
      archived: false
  };
  
  let happening;
  try {
      showLoading();
      happening = await createHappening.mutateAsync({
          ...commonPayload,
          type: commonPayload.type === 'public' ? 'public' : commonPayload.type === 'private' ? 'private' : 'placebound',
          dateHappening: commonPayload.dateHappening?.toString(),
          privacyLevel: commonPayload.privacyLevel === 'open' ? 'open' : commonPayload.type === 'invite-only' ? 'invite-only' : 'rsvp-required'
      });
  } catch (error) {
      console.error('Error creating happening:', error);
  } finally {
    if (happening) {
      hideLoading();
      redirect(`h/${happening.id}`);
    }
  }
  };

  return <Funnel steps={steps} onComplete={handleComplete} />;
};

export default HappeningFunnel;