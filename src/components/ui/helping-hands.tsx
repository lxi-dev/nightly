import React, { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";

const TimeScale = () => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div
      className="w-12 mt-12 text-gray-300 text-sm flex flex-col"
    >
      {hours.map((hour) => (
        <div key={hour} className="relative h-12">
         <div className="absolute top-0 left-12 w-[calc(100vw-4rem)] border-t border-black/20 dark:border-slate-800" />
          <div className="h-full flex items-center justify-center">
            {hour}:00
          </div>
        </div>
      ))}
    </div>
  );
};

type Box = {
  startTime: number;
  duration: number;
  label: string;
};

type ColumnProps = {
  name: string;
  boxes: Box[];
  onUpdateBoxes: (args1: Box[]) => void;
};

const Column = ({
  name,
  boxes,
  onUpdateBoxes,
}: ColumnProps) => {
  const columnRef = useRef<HTMLDivElement>(null);

  const handleAddBox = () => {
    const newBox: Box = { startTime: 0, duration: 1, label: "New Event" };
    const updatedBoxes = resolveOverlaps([...boxes, newBox]);
    if(!onUpdateBoxes) return;
    onUpdateBoxes(updatedBoxes);
  };

  const handleDrag = (index: number, info: PanInfo) => {
    const columnRect = columnRef.current?.getBoundingClientRect();
    if (!columnRect) return;

    // Calculate relative position within the column
    const relativeY = info.point.y - columnRect.top + columnRef.current!.scrollTop;
    const startTime = Math.max(0, Math.min(23.5, relativeY / 64));
    
    const updatedBoxes = [...boxes];
    if (!updatedBoxes[index]) return;
    
    updatedBoxes[index].startTime = startTime;
    updatedBoxes.sort((a, b) => a.startTime - b.startTime);
    onUpdateBoxes(resolveOverlaps(updatedBoxes));
  };

  const handleResize = (index: number, newHeight: number) => {
    const updatedBoxes = [...boxes];
    const box = updatedBoxes[index];
    if (!box) return;
    box.duration = Math.max(0.5, Math.min(24 - box.startTime, newHeight));
    onUpdateBoxes(updatedBoxes);
  };

  const resolveOverlaps = (boxes: Box[]) => {
    for (let i = 0; i < boxes.length - 1; i++) {
      const currentBox = boxes[i];
      const nextBox = boxes[i + 1];
      if (!currentBox || !nextBox) return boxes;
      if (currentBox.startTime + currentBox.duration > nextBox.startTime) {
        nextBox.startTime = currentBox.startTime + currentBox.duration;
        if (nextBox.startTime + nextBox.duration > 24) {
          nextBox.duration = 24 - nextBox.startTime;
        }
      }
    }
    return boxes;
  };

  return (
    <div className="relative w-64 min-w-[16rem] flex flex-col">
      <div className="sticky top-0 z-20">
        <input
          type="text"
          value={name}
          placeholder="Column Name"
          className="text-lg font-semibold text-white bg-transparent w-[80%] p-2 focus:outline-none"
        />
        <button
          className="absolute mt-2 p-2 bg-green-500 text-white rounded"
          onClick={handleAddBox}
        >
          <PlusIcon className="w-4 h-4"/>
        </button>
      </div>
        <div className="relative h-[calc(24*4rem)] border-l border-black/10">
          {boxes.map((box, index) => (
            <motion.div
              key={index}
              className="absolute left-0 right-0 mx-2 bg-blue-500 text-white text-sm rounded-md shadow-md flex flex-col items-center justify-center"
              style={{
                top: `${box.startTime * 4}rem`,
                height: `${box.duration * 4}rem`,
              }}
              drag="y"
              dragMomentum={false}
              onDrag={(e, info) => handleDrag(index, info)}
            >
              <p>{box.label.toString()}</p>
              <div
                className="absolute bottom-0 w-full h-2 bg-gray-700 cursor-s-resize"
                onMouseDown={(e) => {
                  e.preventDefault();
                  const startY = e.clientY;
                  const startHeight = box.duration;
                  const onMouseMove = (moveEvent: MouseEvent) => {
                    const newHeight = startHeight + (moveEvent.clientY - startY) / 64;
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

type Column = {
  name: string;
  boxes: Box[];
};

const TimeScaleColumns = () => {
  const [columns, setColumns] = useState<Column[]>([]);

  const addColumn = () => {
    setColumns((prevColumns) =>
      prevColumns ? [...prevColumns, { name: "", boxes: [] }] : [{ name: "", boxes: [] }]
    );
  };

  const updateColumnBoxes = (index: number, updatedBoxes: Box[]) => {
    if (!columns) return;
    const updatedColumns = [...columns];
    if (!updatedColumns[index]) return;
    updatedColumns[index].boxes = updatedBoxes;
    setColumns(updatedColumns);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
        <div className="flex">
          <div className="sticky left-0 z-10">
            <TimeScale />
          </div>
          <div className="flex-1 overflow-x-auto z-10">
            <div className="flex ml-4">
              {columns.map((column, index) => (
                <Column
                  key={index}
                  name={column.name}
                  boxes={column.boxes}
                  onUpdateBoxes={(updatedBoxes: Box[]) =>
                    updateColumnBoxes(index, updatedBoxes)
                  }
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