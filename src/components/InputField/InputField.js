import React from "react";

const InputField = (props) => {
  //Checks if all the fields are filled and if an @ sign is used in the email field
  const validateInput = (values) => {
    if (values.some((f) => f === "") || values[0].indexOf("@") === -1) {
      return true;
    } else {
      return false;
    }
  };

  if (props.type === "submit") {
    return (
      <input
        className={props.inputClassName}
        type="submit"
        value={props.label}
        disabled={validateInput(props.formValues)}
      />
    );
  }
  if (props.type === "imgButton") {
    return (
      <button
        className={props.inputClassName}
        disabled={validateInput(props.formValues)}
      >
        <props.buttonImg className={props.buttonImgClassName} alt={""} />{" "}
      </button>
    );
  }

  return (
    <input
      onChange={(e) => props.onChangeHandler(e.target.value)}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      required={props.isRequired}
      className={props.inputClassName}
      name={props.name}
    />
  );
};

export default React.memo(InputField);
