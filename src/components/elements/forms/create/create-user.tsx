'use client';

import type { FormProps, FunnelData, Step, Handle, UserProfileInfo, GeoCoordinates } from "nglty/types/funnel";
import { useEffect, useState } from "react";
import { Funnel } from "../funnel";
import { api } from "nglty/trpc/react";
import { motion } from "framer-motion";
import { CheckCircle, Loader2Icon, XCircle } from "lucide-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import type { User } from "next-auth";
import { redirect } from "next/navigation";
import Spinner from "../../spinner";
import ToggleInput from "../fields/toggle";
import { Button } from "nglty/components/ui/button";
import TextInput from "../fields/text";
import { getGeoCoordinates } from "nglty/lib/locationService";
import MapComponent from "../../map";
import { BentoBox } from "../../box";
import DateInput from "../fields/date-picker";
import TextAreaInput from "../fields/text-area";


export const AGBInfoForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
  const [acceptedAGB, setAcceptedAGB] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!acceptedAGB) return;

    onSubmit({ type: "userAGBInfo", data: true});
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-4">
      <div className="text-slate-600 text-left text-lg space-y-4">
        <p>
          Welcome to Nightly
        </p>
        <motion.small
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="block text-gray-500"
        >
          INFO
        </motion.small>
        <p>Nightly stores your authentication provider's information. This usually includes a picture, name, and email address.</p>

        <p className="font-medium">
          Complete your profile to personalize your experience and connect with
          what matters most. Let’s make your nights unforgettable!
        </p>
      </div>

    <ToggleInput label={'Agree to Platform Rules and Privacy'} name={"tos"} value={acceptedAGB} onChange={(e) => setAcceptedAGB(e)} />
      
    <Button type="submit" disabled={!acceptedAGB}>Next</Button>
    </form>
  );
}

export const UserHandleForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<string>('');
  
    const [handleAvailable, setHandleAvailable] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const handleChange = async (e: string) => {
      setData( e );
      await handleBlur();
    };

    const checkHandleAvailability = api.user.checkHandleAvailability.useQuery(
      { handle: data },
      {
          enabled: false, // Prevent the query from running automatically
      } 
    );
    const handleBlur = async () => {
      if (!data) {
          setHandleAvailable(false);
          return;
      }
  
      try {
          setLoading(true);
          const response = await checkHandleAvailability.refetch();
          console.log(response.data);
          if (response.data?.isAvailable) {
              setHandleAvailable(true);
          } else {
              setHandleAvailable(false);
          }
      } catch (error) {
          console.error("Error checking handle availability:", error);
          setHandleAvailable(false);
      } finally {
        setLoading(false);
      }
  };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if(data){
        await handleBlur();
      }
      if(!handleAvailable) return;

      const userHandle = {handle: data} as Handle
      console.log(userHandle);
      onSubmit({ type: "userHandleInfo", data: userHandle});
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto p-4">
              <div className="text-slate-600 text-left text-lg space-y-4">

        <p className="text-slate-600">Your handle is your unique identity on our platform. It’s how others will recognize, connect, and interact with you. Whether you’re posting content, joining conversations, or sharing your ideas, your handle ensures you stand out.</p>
        
        <p className="mb-3 pt-3 text-slate-600">A handle is your unique identity on our platform, helping you stand out, stay recognizable, and connect with others easily. It offers privacy by letting you choose a name that doesn’t reveal personal details while reflecting your personality and making you memorable.</p>
        <p className="mt-2 text-md text-slate-600">Tips for choosing a handle</p>
        <ul className="text-xs space-y-2 pl-4 md:list-disc">
          <li>Keep it short and easy to remember.</li>
          <li>Avoid sensitive personal information.</li>
          <li>Be creative—your handle reflects your personality!</li>
        </ul>
        </div>
        <div className="flex flex-col">

        <label
                htmlFor="handle"
                className="block text-sm font-medium text-gray-700"
                >
                User Handle
              </label>
        <div className="flex items-center space-x-2">
        <input
          id="handle"
          name="handle"
          type="text"
          minLength={3}
          required
          placeholder="Enter your handle"
          value={data}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          className="flex-grow block w-full rounded-md border-gray-300 border-2 p-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm invalid:border-aurora-900"
          />
        {(handleAvailable !== null && !isLoading )&& (
          <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="flex items-center"
          >
            {(!data || data.length === 0) && <QuestionMarkCircleIcon className="text-gray-500 w-5 h-5"/>}
            {(handleAvailable && data.length > 3) && <CheckCircle className="text-green-600 h-5 w-5" />}
            {(!handleAvailable && data.length > 3) && <XCircle className="text-red-600 h-5 w-5" />}
          </motion.div>
        )}
        {isLoading && 
        <motion.span 
        animate={{ rotate: 720 }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}>
            <Loader2Icon />
          </motion.span>
        }
      </div>
      <small className="text-xs text-gray-500 mb-2">Your unique identifier on the platform. Must be between 3-15 characters.</small>
      </div>
      <Button type="submit"          disabled={!handleAvailable || !data}
      >
        Next
      </Button>
      </form>
    );
  };
  
export const UserInfoForm: React.FC<FormProps<FunnelData>> = ({ onSubmit, props }) => {
    const [data, setData] = useState<UserProfileInfo>({});
    const [defaultName, setDefaultName] = useState('');
    const [sessionData, setSessionData] = useState<undefined | User>(undefined);
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [mapData, setMapData] = useState<GeoCoordinates | undefined>(undefined);

  async function fetchCoordinates(value: string) {
    try {
      const result: GeoCoordinates = await getGeoCoordinates(value);
      return result;
    } catch (error) {
      console.error('Failed to fetch GeoCoordinates:', error);
    }
  }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

  // Update the state with the current input value
  setData((prev) => ({ ...prev, [name]: value }));

  // Only debounce if the input name is 'location'
  if (name === 'location') {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      void (async () => {
        const result = await fetchCoordinates(value);
        setMapData(result);
        setData((prev) => ({ ...prev, "geoCoordinates": result }));
      })();
    }, 200);
    setDebounceTimer(timer);
  }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      console.log(data);
      
      

      const defaultPictureUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLC0VtEAnU3BQVLsXVa8ytCHqYS0sn9fdYDA&s";
      if (!data.image && !sessionData?.image) setData({"image":defaultPictureUrl});
      onSubmit({ type: "userProfileInfo", data });
    };

    useEffect(() => {
      if (!props) return
        const session = props;
        if(session.name) {
          setDefaultName(session.name)
          setData({"name":session.name});
        }
        setSessionData(session);
    }, [props])
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row w-full justify-left">
          <div className="w-36 h-36">
            <img
              src={sessionData?.image ?? 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
              className="w-36 h-36rounded-2xl border border-gray-200/20 shadow-lg"
              />
          </div>
          <div className="flex flex-col w-full pl-4">
            <div>
              <TextInput 
              label={'Name'} 
              name={"name"}
              placeholder={defaultName}
              value={data.name!} 
              onChange={handleChange} 
              required/>
            </div>
            <label className="block text-gray-500 mt-2 ml-2 text-sm ">Email: {sessionData?.email ?? 'unavailable'}</label>
          </div>
        </div>
        <p className="text-slate-600">The Above information is gathered through your authentication provider. You can change the profile picture and name to your liking!</p>
        <p className="text-slate-600">Furthermore you can provide information about your Location and a small biography. The provided location will be used to show places around you.</p>
        <div>
          <TextInput 
            label={"Location"} 
            name={"location"}
            value={data.location!} 
            onChange={handleChange} 
            required />
            { mapData && 
            <BentoBox className="mt-6 h-32 overflow-hidden shadow-none">
              <MapComponent locations={[{lat: +mapData.latitude, lng: +mapData.longitude,name: mapData.displayName}]} />
            </BentoBox>
            }
        </div>
        <div>
          <DateInput label={'Date of Birth'} name={'age'} value={data.age!} onChange={handleChange} />
        </div>
        <div>
          <TextAreaInput label={"Bio"} name={"bio"} value={data.bio!} onChange={() => handleChange}            
            />
        </div>
        <Button type="submit">Next</Button>
      </form>
    );
  };

  const UserCompleteFunnel = ({ user }: { user: User }) => {
    const [loading, setLoading] = useState(false);
    const updateUserMutation = api.user.updateProfile.useMutation({
      onSuccess: () => {
        console.log('place created');
      },
    });
    const steps: Step<FunnelData>[] = [
      { label: "AGB", Component: AGBInfoForm },
      { label: "User Handle", Component: UserHandleForm },
      { label: "About", Component: UserInfoForm },
    ];
  
    const handleComplete = async (data: FunnelData[]) => {
      console.log(data);
      const [agbEntry, handleEntry, infoEntry] = data.map(item => item?.data);
      const agb = agbEntry as boolean;
      const handleData = handleEntry as Handle;
      const infoData = infoEntry as UserProfileInfo;

      if(!agb || !handleData || !infoData) return;

      try {
        setLoading(true);
        const updatedProfile = await updateUserMutation.mutateAsync({
          id: user.id!,
          name: infoData.name!,
          image: infoData.image,
          location: infoData.location,
          geoCoordinates: {
            latitude: infoData.geoCoordinates!.latitude,
            longitude:infoData.geoCoordinates!.longitude,
            displayName:infoData.geoCoordinates!.displayName
          },
          bio: infoData.bio,
          age: infoData?.age,
          handle: handleData.handle,
          tos: true
          
        });
        if (updatedProfile) {
          setTimeout(() => {
            redirect('/profile');

          }, 200);
          
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    
      console.log("Funnel completed with data:", data);
    };
    
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      );
    }

    return <Funnel steps={steps} onComplete={handleComplete} user={user}/>;
  };
  
  export default UserCompleteFunnel;