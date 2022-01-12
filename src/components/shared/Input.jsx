import React from "react";
const Input = ({
  name,
  value,
  type = "text",
  label,
  onChange,
  className,
  required = false,
}) => {
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={`${name}${required ? " (required)" : ""}`}
        onChange={onChange}
        className={className}
        required={required}
      />
    </>
  );
};

export default Input;
