'use client';

import React, { useEffect, useState } from "react";
import { Funnel } from "../funnel";
import type { FormProps, FunnelData, HappeningCreate, Step } from "nglty/types/funnel";

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
import TextAreaInput from "../fields/text-area";
import CSVInput from "../fields/csv";
import ToggleInput from "../fields/toggle";
import { redirect } from "next/navigation";
import { Calendar } from "nglty/components/ui/calendar";
import { bentoClass } from "../../box";
import { ImageUpload } from "../fields/image-upload";
import { colorOptions } from "nglty/lib/defaults";
import PickerInput from "../fields/picker";
import TimeInput from "../fields/time";

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
            <MdOutlinePublic className="text-violet-700 w-12 h-12" />
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
        setData((prev) => ({...prev, 
          "venue": place.group ? '' : place.name, 
          "venueId": place.id, 
          "type": 'placebound'
        }));
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

  const options = [
    {id: 'public', label: 'public', description: 'All Members can see your happening!'},
    {id: 'private', label: 'private', description: 'You have to invite Members to your happening.'}
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-6">
        <TripleCheckbox
          name="type"
          // value={data.type}
          onChange={(type) => setData((prev) => ({ ...prev, type }))}
          overwrite={{value: data.type, locked: true}}
        />
        { place && <div><img className="h-20 rounded-lg border md:border-2 border-gray-300 dark:border-gray-700" src={place.picture!} /></div>}
        { !place && <PickerInput options={options} value={data.type} onChange={(type) => {setData((prev => ({...prev, type}))) }} />}
      </div>
      <div>
        <TextInput 
          label="Name" name="name" value={data.name} onChange={handleChange} required/>
      </div>
        <div>
          <TextInput
            label="Location"
            name="venue"
            value={data.venue || ""}
            onChange={handleChange}
            required
            disabled={(place && !place.group )&& true} />
        </div>
      <div>
        <NumberInput 
          label="Max Participants"
          name="maxParticipants"
          value={data.maxParticipants}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="bg-violet-300 text-white px-4 py-2 rounded">
        Next
      </button>
    </form>
  );
};

export const TypeColorForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<Partial<HappeningCreate>>({
      color: "aurora-900",
      tags: [],
      coverImageUrl: undefined,
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };

    const setImageUrl = (e : string | null) => {
      if(!e) return;
      setData((prev) => ({...prev, "coverImageUrl" : e}))
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "happeningTypeColor", data });
    };


  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
        <ImageUpload
              id="cover"
              label="Cover Image"
              description="Drag and drop an image, or click to browse"
              value={data.coverImageUrl ?? undefined}
              onChange={setImageUrl}
              maxSizeMB={5}
            />
        </div>
        <div>
          <CSVInput
            label="Tags"
            name="tags"
            value={data.tags!.join(",")}
            onChange={(e) =>
              setData((prev) => ({ ...prev, tags: e.split(",") }))
            } />
        </div>
        <div>
          <DropdownInput
            label="Event Type"
            name="color"
            value={data.color!}
            onChange={handleChange}
            options={colorOptions}
          />
        </div>
        <button type="submit" className="bg-violet-300 text-white px-4 py-2 rounded">
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
      startTime: '',
      endTime: '',
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
        <div className="w-full">
          <div className="flex gap-6 justify-between  flex-col md:flex-row">
            <Calendar
              mode="single"
              selected={data.dateHappening}
              onSelect={(e) =>
                setData((prev) => ({
                  ...prev,
                  dateHappening: e,
                }))}
              className={`${bentoClass} shadow-none`}
              />
            <div className="w-full">
              <TimeInput label={'Start Time'} name={"startTime"} value={data.startTime!} onChange={(e) => {console.log(e)}} />
              <TimeInput label={'End Time'} name={"endtime"} value={data.endTime!} onChange={(e) => {console.log(e)}} />
              <p className="text-sm text-semibold mt-4 ">If no End Time is selected, the Happening is planned to be open ended!</p>

            </div>
            </div>
      </div>
        <div>
          <TextAreaInput
            label="Description"
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
        <button type="submit" className="bg-violet-300 text-white px-4 py-2 rounded">
          Next
        </button>
      </form>
    );
  };
  
// 4. Summary and Submission
export const SummaryForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<Partial<HappeningCreate>>({
        helpingHandsEnabled: false,
        postsEnabled: true,
        privacyLevel: 'open',
      });
    
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({ type: "happeningSummary", data });
  };

  // const privacyOptions = [
  //   { value: 'open', label: 'public'},
  //   { value: 'invite-only', label: 'Invite Only'},
  //   { value: 'rsvp-req', label: 'Reserveration required'}
  // ]

  return (
    <div className="space-y-4">
      <h3>Settings</h3>
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
      {/* <DropdownInput label="Privacy" name="privacyLevel" value={data.privacyLevel!} options={privacyOptions} onChange={(e) => setData((prev) => ({...prev, privacyLevel: e.target.value}))} /> */}

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

  const createHappening = api.happening.createHappening.useMutation({});

  const handleComplete = async (data: FunnelData[]) => {
    console.log('handleComplete');
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
  
  try {
      showLoading();
      const happening = await createHappening.mutateAsync({
          ...commonPayload,
          type: commonPayload.type === 'public' ? 'public' : commonPayload.type === 'private' ? 'private' : 'placebound',
          dateHappening: commonPayload.dateHappening?.toString(),
          privacyLevel: commonPayload.privacyLevel === 'open' ? 'open' : commonPayload.type === 'invite-only' ? 'invite-only' : 'rsvp-required',
          venueId: generalInfoData.venueId ?? ''
        });
      if(!happening) return;
      
      hideLoading();
      const happeningId = happening as string;
      redirect(`h/${happeningId}`);
    } catch {
      console.error('Error creating happening:');
    } finally {
      // if(happening) {
      //   hideLoading();
      //   redirect(`h/${happening}`);
      // }
  }
  };

  return <Funnel steps={steps} onComplete={handleComplete} />;
};

export default HappeningFunnel;