// 'use client'
// import type { FunnelProps } from "nglty/models/funnel";
// import React, { useState } from "react";

// const FunnelStep: React.FC<{
//   stepIndex: number;
//   currentStep: number;
//   label: string;
//   onClick: (stepIndex: number) => void;
// }> = ({ stepIndex, currentStep, label, onClick }) => {
//   return (
//     <div
//       onClick={() => onClick(stepIndex)}
//       className={`cursor-pointer py-2 px-4 rounded ${
//         stepIndex === currentStep
//           ? "bg-violet-700 text-white"
//           : "bg-gray-400 text-gray-700 hover:bg-gray-200 hidden md:flex"
//       }`}
//     >
//       {label}
//     </div>
//   );
// };

// export const Funnel = <T,>({ steps, onComplete, initialData = [], user }: FunnelProps<T>) => {
//   const [currentStep, setCurrentStep] = useState<number>(0);
//   const [formData, setFormData] = useState<T[]>(
//     initialData.length === steps.length ? initialData : Array(steps.length).fill(null)
//   );

//   const handleNextStep = (data: T) => {
//     console.log('step data: ' + JSON.stringify(data)); 
//     setFormData((prev) => {
//       const updatedData = [...prev];
//       updatedData[currentStep] = data;
  
//       if (currentStep === steps.length - 1) {
//         // Trigger onComplete with the updated data once state has been updated
//         onComplete(updatedData);
//       }
  
//       return updatedData;
//     });
  
//     if (currentStep < steps.length - 1) {
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="flex w-full h-full flex-col md:flex-row">
//       <div className="w-38 flex-none md:h-full rounded-2xl bg-gray-100 dark:bg-slate-900 border border-gray-300 dark:border-slate-800 p-4 gap-6 shadow-lg mr-2 ml-2 md:mr-4 mb-4 mt-2 md:mt-6">
//         <div className="flex-row space-y-5">
//           {steps.map((step, index) => (
//             <FunnelStep
//               key={index}
//               stepIndex={index}
//               currentStep={currentStep}
//               label={step.label}
//               onClick={setCurrentStep}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="w-full md:w-3/4 p-8">
//         {(() => {
//           const StepComponent = steps[currentStep]?.Component;
//           return StepComponent && <StepComponent onSubmit={handleNextStep} props={user ? user : undefined}/>;
//         })()}
//       </div>
//     </div>
//   );
// };

'use client'
import type { FunnelProps } from "nglty/models/funnel";
import React, { useState } from "react";

const FunnelStep: React.FC<{
  stepIndex: number;
  currentStep: number;
  label: string;
  onClick: (stepIndex: number) => void;
}> = ({ stepIndex, currentStep, label, onClick }) => {
  return (
    <div
      onClick={() => onClick(stepIndex)}
      className={`cursor-pointer py-2 px-4 rounded ${
        stepIndex === currentStep
        ? "bg-violet-100 text-violet-700 font-medium"
        : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </div>
  );
};

export const Funnel = <T,>({
  steps,
  onComplete,
  initialData = [],
  user,
}: FunnelProps<T>) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<T[]>(
    initialData.length === steps.length
      ? initialData
      : Array(steps.length).fill(null)
  );

  const handleNextStep = (data: T) => {
    console.log('step data: ' + JSON.stringify(data));
    setFormData((prev) => {
      const updatedData = [...prev];
      updatedData[currentStep] = data;

      if (currentStep === steps.length - 1) {
        // Trigger onComplete with the updated data once state has been updated
        onComplete(updatedData);
      }

      return updatedData;
    });

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="flex w-full h-full flex-col md:flex-row">
      <div className="w-38 flex-none md:h-full md:border-r border-gray-300 dark:border-slate-800 p-4 gap-6 mr-2 ml-2 md:mr-4 mb-4 mt-2 md:mt-6">
        <div className="flex-row space-y-5">
          {steps.map((step, index) => (
            <FunnelStep
              key={index}
              stepIndex={index}
              currentStep={currentStep}
              label={step.label}
              onClick={setCurrentStep}
            />
          ))}
        </div>
      </div>
      <div className="w-full md:w-3/4 p-8">
        {(() => {
          const StepComponent = steps[currentStep]?.Component;
          const currentInitialData =
            typeof steps[currentStep]?.initialData === "function"
              ? steps[currentStep].initialData(formData)
              : undefined;

          return (
            StepComponent && (
              <StepComponent
                onSubmit={handleNextStep}
                initialData={currentInitialData}
                props={user ?? undefined}
              />
            )
          );
        })()}
      </div>
    </div>
  );
};