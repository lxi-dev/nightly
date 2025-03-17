import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import type { PanInfo } from "framer-motion"; 
import { PlusIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";

const TimeScale = ({startTimeDate} : {startTimeDate: Date}) => {

  // let currentTime: Date;
  const hours = Array.from({ length: 24 }, (_, i) => {
      return dayjs(startTimeDate).add(i, 'hour').hour();
  });

  return (
    <div className="w-12 mt-12 text-gray-300 text-sm flex flex-col dark:text-white">
      {hours.map((hour) => (
        <div key={hour} className="relative h-16">
          <div className="absolute top-0 left-12 w-[calc(100vw-4rem)] border-t border-black/20 dark:border-slate-800" />
          <div className="h-full flex items-center justify-center">{hour}:00</div>
        </div>
      ))}
    </div>
  );
};

type Box = {
  startTime: number; // Start time in hours (e.g., 9.5 for 9:30 AM)
  duration: number; // Duration in hours
  label: string;
};

type ColumnProps = {
  name: string;
  boxes: Box[];
  onUpdateBoxes: (updatedBoxes: Box[]) => void;
};

const Column = ({ name, boxes, onUpdateBoxes }: ColumnProps) => {
  const columnRef = useRef<HTMLDivElement>(null);
  const [userSetName, setUserSetName] = useState('');

  const handleAddBox = () => {
    const newBox: Box = { startTime: 0, duration: 1, label: "New Event" };
    const updatedBoxes = resolveOverlaps([...boxes, newBox]);
    if(!updatedBoxes) return;
    onUpdateBoxes(updatedBoxes);
  };

  const handleDrag = (index: number, info: PanInfo) => {
    const columnRect = columnRef.current?.getBoundingClientRect();
    if (!columnRect) return;
  
    const updatedBoxes = [...boxes];
    const box = updatedBoxes[index];
    if (!box) return;
  
    const deltaY = info.delta.y; // Change in position
    const newStartTime = Math.max(
      0,
      Math.min(
        24 - box.duration,
        box.startTime + deltaY / 64 // Adjust by grid size (64px = 1 hour)
      )
    );
  
    box.startTime = Math.round(newStartTime * 2) / 2; // Snap to 30-minute increments
    const rsO = resolveOverlaps(updatedBoxes)!
    onUpdateBoxes(rsO);
  };

  const handleResize = (index: number, newHeight: number) => {
    const updatedBoxes = [...boxes];
    const box = updatedBoxes[index];
    if (!box) return;
  
    const newDuration = Math.max(
      0.5,
      Math.min(24 - box.startTime, newHeight / 64) // Convert height back to duration
    );
  
    box.duration = Math.round(newDuration * 2) / 2; // Snap to 30-minute increments
    onUpdateBoxes(resolveOverlaps(updatedBoxes)!);
  };

  const resolveOverlaps = (boxes: Box[]) : Box[] | undefined => {
    boxes.sort((a, b) => a.startTime - b.startTime);
    for (let i = 0; i < boxes.length - 1; i++) {
      const currentBox = boxes[i];
      const nextBox = boxes[i + 1];
      if(!currentBox || !nextBox) return ;
      if (currentBox.startTime + currentBox.duration > nextBox.startTime) {
        nextBox.startTime = currentBox.startTime + currentBox.duration;
        nextBox.startTime = Math.min(nextBox.startTime, 24 - nextBox.duration);
      }
    }
    return boxes;
  };

  return (
    <div className="relative w-64 min-w-[16rem] flex flex-col">
      <div className="sticky top-0 z-20">
        <input
          type="text"
          value={userSetName}
          onChange={(e) => setUserSetName(e.target.value)}
          placeholder={name}
          className="text-lg font-semibold text-white bg-transparent w-[80%] p-2 focus:outline-none"
        />
        <button
          className="absolute mt-2 p-2 bg-green-500 text-white rounded"
          onClick={handleAddBox}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <div ref={columnRef} className="relative h-[calc(24*4rem)] border-l border-black/10">
        {boxes.map((box, index) => (
          <motion.div
            key={index}
            className="absolute left-0 right-0 mx-2 dark:bg-slate-900 border border-slate-800 rounded-t-2xl  text-white text-sm shadow-md flex flex-col items-center justify-center"
            style={{
              top: `${box.startTime * 4}rem`,
              height: `${box.duration * 4}rem`,
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 24 * 64 }}
            dragMomentum={false}
            onDrag={(e, info) => handleDrag(index, info)}
            whileHover={{scale: 1.02}}
          >
            <p>{box.label}</p>
            <small>{box.startTime.toFixed(2)} hrs</small>
            <small>{box.duration.toFixed(2)} hrs</small>
            <div
  className="absolute bottom-0 w-full h-2 border-b-2 border-gray-700 cursor-s-resize"
  onMouseDown={(e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = box.duration * 64; // Convert duration to pixels

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newHeight = startHeight + deltaY;
      handleResize(index, newHeight);
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }}
/>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const TimeScaleColumns = ({startTime}:{startTime: Date})  => {
  const [columns, setColumns] = useState<{ name: string; boxes: Box[] }[]>([]);

  const addColumn = () => {
    setColumns((prevColumns) => [...prevColumns, { name: "New Column", boxes: [] }]);
  };

  const updateColumnBoxes = (index: number, updatedBoxes: Box[]) => {
    const updatedColumns = [...columns];
    if(!updatedColumns[index]) return;
    updatedColumns[index].boxes = updatedBoxes;
    setColumns(updatedColumns);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="flex">
          <div className="sticky left-0 z-10">
            <TimeScale startTimeDate={startTime}/>
          </div>
          <div className="flex-1 overflow-x-auto z-10">
            <div className="flex ml-4">
              {columns.map((column, index) => (
                <Column
                  key={index}
                  name={column.name}
                  boxes={column.boxes}
                  onUpdateBoxes={(updatedBoxes) => updateColumnBoxes(index, updatedBoxes)}
                />
              ))}
              <button
                className="self-start m-4 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0"
                onClick={addColumn}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeScaleColumns;