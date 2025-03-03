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
      className={`cursor-pointer py-2 px-4 rounded-lg ${
        stepIndex === currentStep
          ? "bg-blue-500 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
    >
      {label}
    </div>
  );
};

export const Funnel = <T,>({ steps, onComplete, initialData = [] }: FunnelProps<T>) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<T[]>(
    initialData.length === steps.length ? initialData : Array(steps.length).fill(null)
  );

  const handleNextStep = (data: T) => {
    setFormData((prev) => {
      const updatedData = [...prev];
      updatedData[currentStep] = data;
      return updatedData;
    });

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <div className="flex w-full h-full flex-col md:flex-row">
      <div className="w-38 flex-none md:h-64 rounded-md mr-4 mb-4">
        <div className="space-y-4 flex-row">
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
      <div className="w-full md:w-3/4 p-8 bg-gray-100 rounded-md">
        {(() => {
          const StepComponent = steps[currentStep]?.Component;
          return StepComponent && <StepComponent onSubmit={handleNextStep} />;
        })()}
      </div>
    </div>
  );
};