'use client'
import type { FunnelProps } from "nglty/types/funnel";
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
      className={`cursor-pointer py-2 px-4 hidden md:block rounded ${
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
      return updatedData;
    });
  
    if (currentStep === steps.length - 1) {
      onComplete([...formData.slice(0, currentStep), data]);
    } else if (currentStep < steps.length - 1) {
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