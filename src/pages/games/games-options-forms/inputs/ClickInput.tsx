import { Dispatch, SetStateAction, useState, useEffect } from "react";

type clickInputProps<T> = {
  title: string;
  icon: string;
  defaultValue: string | number;
  optionsArray: string[] | number[];
  setOptions: Dispatch<SetStateAction<T | {}>>;
  resetForm: boolean;
};

const ClickInput = <T,>(props: clickInputProps<T>) => {
  const { title, icon, defaultValue, optionsArray, setOptions, resetForm } =
    props;

  const [value, setValue] = useState<string | number>(defaultValue);

  const handleChangeValue = (opt: number | string) => {
    setValue(opt);
    setOptions((prevOptions: any) => ({
      ...prevOptions,
      numberOfFlag: opt,
    }));
  };

  useEffect(() => {
    if (resetForm) {
      setValue(defaultValue);
      setOptions((prevOptions: any) => ({
        ...prevOptions,
        [title]: defaultValue,
      }));
    } else {
      setOptions({});
    }
  }, [resetForm]);

  return (
    <div className="clickInput">
      <div className="clickInput-title">
        <i className={icon}></i>
        <h4>{title}</h4>
      </div>
      <div className="clickInput-value">
        {optionsArray.map((opt) => (
          <button
            className={`${opt === value ? " active" : "inactive"}`}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleChangeValue(opt);
            }}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ClickInput;
