import React, { useState } from "react";

function FormInput(props) {
  const [focused, setFocused] = useState(false);
  const { handleChange, label, invalidMessage, ...inputProps } = props;

  return (
      <div className="input-container">
        <input
          {...inputProps}
          placeholder=" "
          onChange={(e) => handleChange(e)}
          onBlur={() => setFocused(true)}
          focused={focused.toString()}
          required
        />
        <label htmlFor={inputProps.id}>
          <span className="text">{label}</span>
        </label>
        <span className="invalid-message">{invalidMessage}</span>
      </div>
  );
}

export default FormInput;
