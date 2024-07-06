import React from "react";
import { Input } from "../input";

interface FormProps {
  name: string;
  type: string;
  placeholder: string;
  title: string;
}

const Form: React.FC<FormProps> = ({
  name,
  type,
  placeholder,
  title,
}) => {
  return (
    <>
      <label className="text-lg font-bold mb-1 mt-2 " htmlFor={name}>
        {title}
      </label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className="p-2 text-sm"
      />
    </>
  );
};

export default Form
