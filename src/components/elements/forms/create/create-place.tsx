'use client';

import type { FormProps, FunnelData, AddressDetails, Step, OpeningHourDay, PlaceCreate } from "nglty/models/funnel";
import { useState } from "react";
import { Funnel } from "../funnel";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import { motion } from "motion/react";
import PickerInput from "../fields/picker";
import TextInput from "../fields/text";
import NumberInput from "../fields/number";
import DropdownInput from "../fields/dropdown";
import { categoryOptions } from "nglty/lib/defaults";
import { CheckCircle, Trash2, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { useLoading } from "nglty/contexts/loadingContext";
import { api } from "nglty/trpc/react";
import CSVInput from "../fields/csv";
import { ImageUpload } from "../fields/image-upload";
import ToggleInput from "../fields/toggle";

export const PlaceInfoForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<Partial<PlaceCreate>>({ name: "", description: "", picture: "", category: 'bar' });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => {
      if (e.target instanceof HTMLInputElement) {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
      } else {
        setData((prev) => ({ ...prev, description: e.target.value }));
      }
    };

    const setImageUrl = (e: string | null) => {
      if(!e) return;
      setData((prev) => ({...prev , "image": e }));
    }

    const setCategory = (e: string | null) => {
      if(!e) return;
      setData((prev) => ({...prev, 'category': e}))
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "placeInfo", data });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <TextInput label={'Name'} name={'name'} value={data.name!} onChange={handleChange} required/>
        </div>
        <div>
          <DropdownInput 
            label={'Category'} 
            name={'category'} 
            value={data.category!} 
            options={categoryOptions} 
            onChange={(e) => setCategory(e.target.value)} />
        </div>
        <div>
          <ImageUpload
              id="cover"
              label="Cover Image"
              description="Drag and drop an image, or click to browse"
              value={data.picture ?? undefined}
              onChange={setImageUrl}
              maxSizeMB={5}
            />
        </div>
        <div>
          <label className="block font-semibold dark:text-slate-700 mb-2">Description</label>
          <small>Use rich text editor to create your places description.</small>
          <EditorProvider>
          <Editor
            value={data.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm"
          /></EditorProvider>
        </div>
        <button
          type="submit"
          className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          Next
        </button>
      </form>
    );
  };

export const LocationForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<AddressDetails>({ heartplace: true, address: "", city: "" });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };
    const setHeartPlace = (e: boolean) => {
      setData((prev) => ({ ...prev, heartplace: e }));
    };

    const setAdress = (e: string) => {
      setData((prev) => ({ ...prev, address: e}));
    }
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "addressDetails", data });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-xl">Where is your place?</h2>
          <div className="mt-4 flex flex-col md:flex-row gap-6">
          {/* <CheckboxHeartHouse name="heartplace" value={data.heartplace} onChange={(e) => setHeartPlace(e)}></CheckboxHeartHouse> */}
          <PickerInput options={[{id: '0', label: 'Heartplace', description:'For Groups without a House'},{id: '1', label: 'Local', description:'This is it, when you have an address!'}]} value={data.heartplace ? '0' : '1'} onChange={(e) => setHeartPlace(e === '0' ? true: false)} />
          </div>
          <p>Your Place can either be a real place or a place in your heart. Real Places are better suited for any kind of business, where as a place in your heart better represents a common idea. </p>
          <small>Tap the icon to change what kind of place you want to own. This decision is irreversable</small>
          
          <div className="w-full flex flex-col gap-4 mt-5">
          { !data.heartplace &&
            <TextInput
              label="Address"
              name="address"
              value={data.address!}
              onChange={(e) => setAdress(e.target.value)}
            />
          }
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="flex flex-col w-1/4">
          <NumberInput label="Zipcode" name="zip" value={data.zip!} onChange={handleChange} />
          </div>
          <div className="flex flex-col w-3/4">
          <TextInput label="City" name="city" value={data.city} onChange={handleChange} />
        </div>
        </div>
        <button
          type="submit"
          className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          Next
        </button>
      </form>
    );
  };
  type DayHours = { from: string; to: string };
  type OpeningHoursInputProps = {
    name: string;
    value?: { day: string; hours: DayHours[] }[];
    onChange?: (value: OpeningHourDay[]) => void;
  };
  
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const OpeningHoursInput: React.FC<OpeningHoursInputProps> = ({
    name,
    value = [{ day: "Monday", hours: [{ from: "", to: "" }] }],
    onChange,
  }) => {
    const [entries, setEntries] = useState(value);
  
    const handleInputChange = (
      index: number,
      hourIndex: number,
      key: "from" | "to",
      newValue: string
    ) => {
      const updatedEntries = [...entries];
      if (!updatedEntries[index]) return;
      if (!updatedEntries[index]?.hours?.[hourIndex]) return;
      
      // Update the correct property (from or to) based on the key parameter
      updatedEntries[index].hours[hourIndex][key] = newValue;
      setEntries(updatedEntries);
      if (onChange) onChange(updatedEntries as OpeningHourDay[]);
    };
  
    const handleDayChange = (index: number, newDay: string) => {
      const updatedEntries = [...entries];
      if (!updatedEntries[index]) return;
      updatedEntries[index].day = newDay;
      setEntries(updatedEntries);
      if (onChange) onChange(updatedEntries);
    };
  
    const addTimeSlot = (index: number) => {
      if (index === undefined) return;
      const updatedEntries = [...entries];
      // Check if the entry exists at this index
      if (!updatedEntries[index]) return;
      if (!updatedEntries[index].hours) {
        updatedEntries[index].hours = [];
      }
      // Add the new time slot
      updatedEntries[index].hours.push({ from: "", to: "" });
      setEntries(updatedEntries);
      if (onChange) onChange(updatedEntries);
    };
  
    const addDay = () => {
      setEntries([...entries, { day: "", hours: [{ from: "", to: "" }] }]);
    };
  
    const removeDay = (index: number) => {
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
      if (onChange) onChange(updatedEntries);
    };
  
    return (
      <div className="flex items-center justify-start overflow-x-auto space-x-4 p-4">
        {entries.map((entry, index) => (
          <motion.div
            key={index}
            className={`flex flex-col bg-white rounded-2xl shadow-lg p-4 min-w-[250px] transition-all duration-300 ring-1 ring-gray-300`}
          >
            <div className="flex items-center mb-4 space-x-2">
              <CheckCircle
                className={`w-6 h-6 ${
                  entry.hours.some((slot) => slot.from && slot.to)
                    ? "text-violet-700"
                    : "text-gray-400"
                }`}
              />
              <select
                className="p-2 border rounded-lg outline-none focus:ring focus:ring-violet-700 text-gray-700"
                value={entry.day}
                onChange={(e) => handleDayChange(index, e.target.value)}
              >
                <option value="" disabled>
                  Select a day
                </option>
                {daysOfWeek.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeDay(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
  
            {entry.hours.map((slot, hourIndex) => (
              <div key={hourIndex} className="flex space-y-2 mb-2">
                <input
                  type="time"
                  name={`${name}-${index}-from-${hourIndex}`}
                  value={slot.from}
                  onChange={(e) => handleInputChange(index, hourIndex, "from", e.target.value)}
                  className="flex-1 p-2 border rounded-lg outline-none focus:ring focus:ring-violet-700 text-gray-700"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="time"
                  name={`${name}-${index}-to-${hourIndex}`}
                  value={slot.to}
                  onChange={(e) => handleInputChange(index, hourIndex, "to", e.target.value)}
                  className="flex-1 p-2 border rounded-lg outline-none focus:ring focus:ring-violet-700 text-gray-700"
                />
              </div>
            ))}
  
            <button
              type="button"
              onClick={() => addTimeSlot(index)}
              className="mt-2 text-violet-700 text-sm hover:underline"
            >
              + Add Time Slot
            </button>
          </motion.div>
        ))}
  
        <button
          type="button"
          onClick={addDay}
          className="flex items-center justify-center bg-white rounded-2xl shadow-lg p-4 min-w-[250px] text-violet-700 text-sm hover:underline"
        >
          <Plus className="w-6 h-6 mr-2" /> Add Day
        </button>
  
        <input type="hidden" name={name} value={JSON.stringify(entries)} />
      </div>
    );
  };
    
export const OpeningHoursFormInfoForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<Partial<PlaceCreate>>({ openingHours: [], tags: [], applicationsEnabled: false, visibility: 'public' });
  


    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "openingHoursInfo", data });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Opening Hours</label>
          <OpeningHoursInput name="openingHours" onChange={(e) => setData((prev) => ({...prev, 'openingHours': e}))}/>
        </div>
        <CSVInput label={'Tags'} name={'tags'} value={data.tags!.join(',')} onChange={(e) => setData((prev) => ({...prev, 'tags': e.split(',')}))} />
        <ToggleInput label={'Visible'} name={'visibility'} value={data.visibility === 'public' ? true : false} onChange={(e) => setData((prev) => ({...prev, 'visibility': e ? 'public' : 'private'}))} />
        <ToggleInput label={'Enable Applications'} name={'applicationsEnabled'} value={data.applicationsEnabled!} onChange={(e) => setData((prev) => ({...prev, 'applicationsEnabled': e}))} />
        <div>
        </div>
        <button
          type="submit"
          className="bg-violet-700 text-white px-4 py-2 rounded-lg hover:bg-violet-700"
        >
          Next
        </button>
      </form>
    );
  };

  
  const CreatePlaceFunnel = () => {
    const createPlaceMutation = api.places.createPlace.useMutation({
      onSuccess: () => {
        console.log('place created');
      },
    });
    const steps: Step<FunnelData>[] = [
      { label: "Place Information", Component: PlaceInfoForm },
      { label: "Location", Component: LocationForm },
      { label: "Opening Hours?", Component: OpeningHoursFormInfoForm },
    ];

    const convertOpeningHours = (data: OpeningHourDay[]): Record<string, string> | undefined => {
      const result: Record<string, string> = {};
      
      if(!data) return undefined;
      
      data.forEach((dayInfo) => {
        const hoursString = dayInfo.hours
        .map(({ from, to }) => `${from}-${to}`)
        .join(", ");
        
        result[dayInfo.day.toLowerCase()] = hoursString;
      });
      
      return result;
    }
    
    const { showLoading, hideLoading } = useLoading();
    const handleComplete = async (data: FunnelData[]) => {
      showLoading();
      const [placeDataEntry, locationDataEntry, openingHoursEntry] = data.map(item => item?.data);
      const placeData = placeDataEntry as Partial<PlaceCreate>;
      const locationData = locationDataEntry as Partial<PlaceCreate>;
      const placeInfo = openingHoursEntry as Partial<PlaceCreate>;

      const defaultPictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLC0VtEAnU3BQVLsXVa8ytCHqYS0sn9fdYDA&s";
      const commonPayload = {
        name: placeData.name!,
        category: placeData.category!,
        picture: placeData.picture === "" ? defaultPictureUrl : placeData.picture!,
        description: placeData.description,
        heartPlace: locationData?.heartplace,
        tags: placeInfo.tags
      };
      const openingHours = placeInfo.openingHours;
      let place;
      try {
        if (!openingHours || locationData?.heartplace) {
          place = await createPlaceMutation.mutateAsync(commonPayload);
        } else {
          place = await createPlaceMutation.mutateAsync({
            ...commonPayload,
            address: locationData?.address,
            city: locationData?.city,
            zipcode: locationData?.zipcode?.toString() ?? "",
            openingHours: convertOpeningHours(openingHours),
          });
        }
      } catch (error) {
        console.error("Error completing the funnel:", error);
      } finally {
        if (place) {
          hideLoading();
          redirect(`p/${place.id}`);
        }
      }
    
      console.log("Funnel completed with data:", data);
    };
  
    return <Funnel steps={steps} onComplete={handleComplete} />;
  };
  
  export default CreatePlaceFunnel;