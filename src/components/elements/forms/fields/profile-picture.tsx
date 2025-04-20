"use client"

import { useState, useRef, useEffect } from "react";
import { BentoBox } from "../../box";
import { Slider } from "nglty/components/ui/slider";
import { Button } from "nglty/components/ui/button";
//import { useLoading } from "nglty/contexts/loadingContext";

/** Types for Shape and Grid Item */
type Shape = "circle" | "square" | "triangle" | "diamond";

// type VercelBlobResponse = {
//     url: string; // The URL to access the blob
//     name: string; // The name of the blob/file
//     size: number; // The size of the blob in bytes
//     type: string; // The MIME type of the blob
//     success: boolean;
//   };

type GridItem = {
  shape: Shape;
  color: string;
  visible: boolean;
};

/** Constants */
const COLORS: string[] = [
  "#f44336", // red
  "#e91e63", // pink
  "#9c27b0", // purple
  "#673ab7", // deep purple
  "#3f51b5", // indigo
  "#2196f3", // blue
  "#03a9f4", // light blue
  "#00bcd4", // cyan
  "#009688", // teal
  "#4caf50", // green
  "#8bc34a", // light green
  "#cddc39", // lime
  "#ffeb3b", // yellow
  "#ffc107", // amber
  "#ff9800", // orange
  "#ff5722", // deep orange
  "#795548", // brown
  "#9e9e9e", // grey
  "#607d8b", // blue grey
  "#ffffff", // white
  "#000000", // black
];

const SHAPES: Shape[] = ["circle", "square", "triangle", "diamond"];

/** Component */
export default function ProfilePictureGenerator(): JSX.Element {
  const [gridSize, setGridSize] = useState<number>(5);
  //const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]!);
  //const [selectedShape, setSelectedShape] = useState<Shape>("circle");
  const [grid, setGrid] = useState<GridItem[][]>([]);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
    //const { showLoading, hideLoading } = useLoading(); 
  /** Initialize grid */
  useEffect(() => {
    initializeGrid();
  }, [gridSize]);

  const initializeGrid = (): void => {
    const newGrid: GridItem[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        shape: "circle",
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        visible: Math.random() > 0.5,
      }))
    );
    setGrid(newGrid);
  };

//   const handleCellClick = (rowIndex: number, colIndex: number): void => {
//     setGrid((prevGrid) => {
//       const newGrid = prevGrid.map((row, rIdx) =>
//         row.map((cell, cIdx) =>
//           rIdx === rowIndex && cIdx === colIndex
//             ? { shape: selectedShape, color: selectedColor, visible: true }
//             : cell
//         )
//       );
//       return newGrid;
//     });
//   };

  const generateRandomAvatar = (): void => {
    const newGrid: GridItem[][] = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)]!,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
        visible: Math.random() > 0.3,
      }))
    );
    setGrid(newGrid);
  };

  const renderShape = (
    ctx: CanvasRenderingContext2D,
    shape: Shape,
    x: number,
    y: number,
    size: number,
    color: string
  ): void => {
    ctx.fillStyle = color;

    switch (shape) {
      case "circle":
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case "square":
        ctx.fillRect(x, y, size, size);
        break;
      case "triangle":
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size, y + size);
        ctx.lineTo(x, y + size);
        ctx.closePath();
        ctx.fill();
        break;
      case "diamond":
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size, y + size / 2);
        ctx.lineTo(x + size / 2, y + size);
        ctx.lineTo(x, y + size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }
  };

  const renderCanvas = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasSize = 300;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const cellSize = canvasSize / gridSize;

    // Draw background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw grid items
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.visible) {
          renderShape(ctx, cell.shape, colIndex * cellSize, rowIndex * cellSize, cellSize, cell.color);
        }
      });
    });
  };

  useEffect(() => {
    renderCanvas();
  }, [grid, backgroundColor]);

  const downloadAvatar = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "profile-avatar.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

//   const uploadAvatar = async () => {
//     try {
//       showLoading();
//       const canvas = canvasRef.current
//       if (!canvas) return

//       // Convert canvas to blob
//       const blob = await new Promise<Blob>((resolve) => {
//         canvas.toBlob((blob) => {
//           if (blob) resolve(blob)
//         }, "image/png")
//       })


//       const formData = new FormData()
//       formData.append('file', blob)
      
//       const response = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       })
      
//       const result: VercelBlobResponse = await response.json() as VercelBlobResponse
      
//       if (!result.success) {
//         throw new Error('Upload failed')
//       }

//       // For demo purposes, we'll just simulate a successful upload
//       setTimeout(() => {
//         alert("Avatar uploaded successfully!")
//         initializeGrid()
//         hideLoading()
//       }, 1500)
//     } catch (error) {
//       console.error("Error uploading avatar:", error)
//       alert("Failed to upload avatar")
//       initializeGrid()
//       hideLoading()
//     }
//   }
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4">
      <BentoBox className="w-full p-4">
          <p className="text-2xl font-bold text-center">Profile Picture Generator</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Grid Size</h3>
                <div className="flex items-center space-x-2">
                  <Slider
                    value={[gridSize]}
                    min={3}
                    max={8}
                    step={1}
                    onValueChange={(value) => setGridSize(value[0]!)}
                    className="w-full"
                  />
                  <span className="w-12 text-center">
                    {gridSize}×{gridSize}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Background Color</h3>
                <div className="grid grid-cols-10 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border ${
                        backgroundColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setBackgroundColor(color)}
                      aria-label={`Select ${color} as background color`}
                    />
                  ))}
                </div>
              </div>
{/* 
              <Tabs defaultActiveTab="color">
                <Tab id="color" label="Color">
                <div className="grid grid-cols-10 gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full border ${
                          selectedColor === color ? "ring-2 ring-offset-2 ring-black" : ""
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color}`}
                      />
                    ))}
                  </div>
                </Tab>
                <Tab id="shape" label="Shape">
                <RadioGroup
                    value={selectedShape}
                    onValueChange={(value) => setSelectedShape(value as Shape)}
                    className="grid grid-cols-4 gap-4"
                  >
                    {SHAPES.map((shape) => (
                      <div key={shape} className="flex items-center space-x-2">
                        <RadioGroupItem value={shape} id={shape} />
                        <Label htmlFor={shape} className="flex items-center">
                          {shape === "circle" && <div className="w-6 h-6 rounded-full bg-black ml-2" />}
                          {shape === "square" && <div className="w-6 h-6 bg-black ml-2" />}
                          {shape === "triangle" && (
                            <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[20px] border-l-transparent border-r-transparent border-b-black ml-2" />
                          )}
                          {shape === "diamond" && <div className="w-6 h-6 bg-black ml-2 transform rotate-45" />}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </Tab>
              </Tabs> */}
            </div>

            <div className="flex flex-col items-center space-y-6">
              <canvas ref={canvasRef} width={300} height={300} className="border rounded-md shadow-md" />
            </div>
          </div>
        <div className="w-full flex flex-row items-start mt-4 gap-4">
          <Button variant="destructive" onClick={initializeGrid}>
            Reset Grid
          </Button>
          <Button onClick={generateRandomAvatar} variant="outline" className="w-full">
                Generate Random Avatar
              </Button>
          <Button variant="ghost" onClick={downloadAvatar} className="w-full">
                Download Avatar
              </Button>
          {/* <Button variant="secondary" onClick={uploadAvatar}>
            Save Avatar
          </Button> */}
        </div>
      </BentoBox>
    </div>
  );
}
