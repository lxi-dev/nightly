'use client';

import type { FormProps, FunnelData, PersonalInfo, PaymentInfo, Step } from "nglty/models/funnel";
import { useState } from "react";
import { Funnel } from "./funnel";

export const PersonalInfoForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<PersonalInfo>({ name: "", email: "" });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "personalInfo", data });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </form>
    );
  };
  
export const PaymentInfoForm: React.FC<FormProps<FunnelData>> = ({ onSubmit }) => {
    const [data, setData] = useState<PaymentInfo>({ cardNumber: "", expiryDate: "" });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ type: "paymentInfo", data });
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={data.cardNumber}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={data.expiryDate}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-lg shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </form>
    );
  };

  const Example = () => {
    const steps: Step<FunnelData>[] = [
      { label: "Personal Info", Component: PersonalInfoForm },
      { label: "Payment Info", Component: PaymentInfoForm },
      { label: "Payment Info", Component: PaymentInfoForm },
      { label: "Payment Info", Component: PaymentInfoForm },
      { label: "Payment Info", Component: PaymentInfoForm },
    ];
  
    const handleComplete = (data: FunnelData[]) => {
      console.log("Funnel completed with data:", data);
    };
  
    return <Funnel steps={steps} onComplete={handleComplete} />;
  };
  
  export default Example;