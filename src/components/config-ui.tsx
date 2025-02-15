'use client';
import { api } from "nglty/trpc/react";
import { useState } from "react";
import { BentoBox } from "./elements/box";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

type HappeningCreate = {
  type: "private" | "placebound" | "public";
  published: boolean;
  name: string;
  venue: string;
  color: string;
  text: string;
  dateHappening?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const HappeningForm = () => {
  const [pending, setPending] = useState(false);
  const [createdHappening, setCreatedHappening] = useState('');
  const [happening, setHappening] = useState<HappeningCreate>({
    type: "private",
    published: false,
    name: "",
    venue: "",
    color: 'aurora-900',
    text: "",
    createdAt: new Date,
    updatedAt: new Date,
  });

  const colorOptions = [
    "aurora-200",
    "aurora-300",
    "aurora-400",
    "aurora-500",
    "aurora-600",
    "aurora-700",
    "aurora-800",
    "aurora-900"
  ];

  const handleChange = (field: string, value: string | Date) => {
    setHappening((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const now = new Date();
    setHappening((prev) => ({
      ...prev,
      createdAt: prev.createdAt || now,
      updatedAt: now,
    }));
    alert("Happening submitted!");
    await callCreate(happening) 
  };

  const createHappening = api.happening.createHappening.useMutation({
        onSuccess: async () => {
          console.log("mutation");
        },
      });
  
  const callCreate = async (userInput : HappeningCreate) => {
    try {
      setPending(true);
      const happening = await createHappening.mutateAsync({
        type: userInput.type === 'public' ? 'public' : userInput.type === 'private' ? 'private' : 'placebound',
        published: false,
        name: userInput.name,
        venue: userInput.venue,
        color: userInput.color,
        text: userInput.text || undefined,
        createdAt: new Date(),
        dateHappening: userInput.dateHappening?.toString()
      });
  
      //console.log("Happening created:", happening);
      setCreatedHappening(happening.id);
    } catch (error) {
      console.error("Error creating happening:", error);
    }
    setPending(false);
  };
  return (
    <main className={`w-full mx-auto`}>
      <BentoBox colSpan="1" rowSpan="1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row">
            <Link
              href="/happen">
            <button className={`w-16 h-full bg-black text-white text-md`}>
              <ArrowLeftIcon className="w-12 h-12 m-auto"/>
            </button>
            </Link>
            { createdHappening !== '' && 
              <h2 className="text-xl font-bold mb-4 dark:text-white pt-4 pl-4">
                {createdHappening}
              </h2>
            }
            {
              createdHappening === '' &&
            <h2 className="text-xl font-bold mb-4 dark:text-white pt-4 pl-4">
              {pending ? 'Happening in creation ...' : 'Create Happening'}
            </h2>
            }
          </div>
          <div>
          { createdHappening !== '' && 
            <button className={`w-16 h-full bg-${happening.color} text-white text-md`}>
              <ArrowRightIcon className="w-12 h-12 m-auto"/>
            </button>
          }
          </div>

        </div>
      </BentoBox>
      <div className={`${pending || createdHappening !== '' ? 'blur-md' : ''} grid grid-cols-8 gap-4 mt-4`}>
      <div className="mb-4 col-span-4">
        <label className="block font-semibold mb-2 dark:text-slate-700">Name</label>
        <input
          type="text"
          value={happening.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="Enter name"
          className="w-full p-2 border dark:text-white dark:border-slate-800 rounded dark:bg-slate-900"
        />
      </div>
      <div className="mb-4 col-span-4">
        <label className="block font-semibold mb-2 dark:text-slate-700">Venue</label>
        <input
          type="text"
          value={happening.venue}
          onChange={(e) => handleChange("venue", e.target.value)}
          placeholder="Enter venue"
          className="w-full p-2 border rounded dark:text-white dark:border-slate-800 dark:bg-slate-900"
        />
      </div>
      <div className="mb-4 col-span-2">
        <label className="block font-semibold mb-2 dark:text-slate-700">Type</label>
        <select
          value={happening.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="w-full p-2 border rounded dark:text-white dark:border-slate-800 dark:bg-slate-900"
        >
          <option value="private">Private</option>
          <option value="placebound">Placebound</option>
          <option value="public">Public</option>
        </select>
      </div>
      <div className="mb-4 col-span-2">
        <label className="block font-semibold dark:text-slate-700 mb-2">Color</label>
        <select
          value={happening.color}
          onChange={(e) =>
            handleChange(
              "color",
              e.target.value)
            
          }
          className="w-full p-2 border rounded dark:border-slate-800 dark:bg-slate-900 dark:text-white"
        >
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4 col-span-4">
        <label className="block font-semibold mb-2 dark:text-slate-700">Date of Happening</label>
        <input
          type="date"
          value={happening.dateHappening?.toString() ?? ""}
          onChange={(e) => handleChange("dateHappening", e.target.value)}
          className="w-full p-2 border rounded dark:text-white dark:bg-slate-900 dark:border-slate-800"
        />
      </div>
      <div className="mb-4 col-span-8">
        <label className="block font-semibold mb-2 dark:text-slate-700">Text</label>
        <textarea
          value={happening.text}
          onChange={(e) => handleChange("text", e.target.value)}
          placeholder="Enter text"
          className="w-full p-2 h-36 border rounded dark:text-white dark:bg-slate-900 dark:border-slate-800"
        ></textarea>
      </div>
      <div className="mb-4 col-span-4 opacity-50 blur-sm">
        <button className={`w-full p-2 border rounded bg-slate-500`} disabled>
          Invitees
        </button>
      </div>
      <div className="mb-4 col-span-4">
      <button
        className={`w-full p-2 border rounded text-sm font-bold text-${happening.color} dark:bg-white`}
        onClick={handleSubmit}
      >
        Create
      </button>
      </div>
      {JSON.stringify(happening)}
    </div>
      </main>
  );
};

export default HappeningForm;
