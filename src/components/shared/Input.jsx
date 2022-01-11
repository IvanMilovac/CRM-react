import React from "react";
const Input = ({ name, value, type = "text", label, onChange, className }) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={name}
        onChange={onChange}
        className={className}
      />
    </>
  );
};

export default Input;
