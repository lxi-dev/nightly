/*

import {  CheckCircle, Plus, Trash2 } from "lucide-react";
import { api } from "nglty/trpc/react";
import { redirect } from "next/navigation";
import { useLoading } from "nglty/contexts/loadingContext";
import { ImageUpload } from "../fields/image-upload";
import TextInput from "../fields/text";
import DropdownInput from "../fields/dropdown";
import { categoryOptions } from "nglty/lib/defaults";
import NumberInput from "../fields/number";
import PickerInput from "../fields/picker";
import ToggleInput from "../fields/toggle";
import CSVInput from "../fields/csv";
  
  type AnimatedTextInputProps = {
    name: string;
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
  };
  
  type CheckboxHeartHouseProps = {
    name: string;
    value?: boolean;
    onChange?: (value: boolean) => void;
  };
  
  const CheckboxHeartHouse: React.FC<CheckboxHeartHouseProps> = ({ name, value = false, onChange }) => {
    const [checked, setChecked] = useState(value);
  
    const handleClick = () => {
      const newValue = !checked;
      setChecked(newValue);
      if (onChange) onChange(newValue);
    };
  
    return (
      <div className="flex items-center justify-center h-full">
        <motion.div
          className="p-4 bg-white rounded-2xl shadow-lg cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
        >
          {checked ? (
            <motion.div
              key="heart"
              initial={{ scale: 0, rotate: -45, color: "#f87171" }}
              animate={{ scale: 1, rotate: 0, color: "#ef4444" }}
              exit={{ scale: 0, rotate: 45, color: "#f87171" }}
              transition={{ duration: 0.3 }}
            >
              <HeartIcon className="text-red-500 w-12 h-12" />
            </motion.div>
          ) : (
            <motion.div
              key="house"
              initial={{ scale: 0, rotate: 45, color: "#60a5fa" }}
              animate={{ scale: 1, rotate: 0, color: "#3b82f6" }}
              exit={{ scale: 0, rotate: -45, color: "#60a5fa" }}
              transition={{ duration: 0.3 }}
            >
              <HomeIcon className="text-violet-700 w-12 h-12" />
            </motion.div>
          )}
        </motion.div>
        <input type="checkbox" name={name} value={String(checked)} hidden readOnly />
      </div>
    );
  };
  */