import React, { useState, createContext } from "react";

export const FormContext = createContext();

const Form = ({ children, className, initialState, onSubmit }) => {
  const [formState, setFormState] = useState(initialState);
  const handleChange = ({ target: { name, value } }) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <form className={className} onSubmit={onSubmit}>
      <FormContext.Provider value={{ formState, setFormState, handleChange }}>
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;
