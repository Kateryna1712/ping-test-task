import React from "react";

interface TextInputProps {
  type?: string;
  placeholder: string;
  value: string;
  setValue: (item: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  setValue,
  type
}) => {
  return (
    <div className="w-100">
      <input
        type={type}
        className={`w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextInput;
