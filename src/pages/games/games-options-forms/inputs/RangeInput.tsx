import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

type RangeInputProps<T> = {
  title: string;
  icon: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  setOptions: Dispatch<SetStateAction<T | {}>>;
  resetForm: boolean;
};

const RangeInput = <T,>(props: RangeInputProps<T>) => {
  const {
    title,
    icon,
    defaultValue,
    minValue,
    maxValue,
    setOptions,
    resetForm,
  } = props;
  const [value, setValue] = useState<number>(defaultValue);
  const [isUnlimitedValue, setIsUnlimitedValue] = useState<boolean>(false);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    if (newValue <= maxValue) {
      setValue(newValue);
      setOptions((prevOptions: T) => ({
        ...prevOptions,
        [title]: newValue,
      }));
    }
  };

  const handleChangeUnlimitedValue = () => {
    setIsUnlimitedValue((prev: boolean) => {
      const newUnlimitedValue = !prev;
      setOptions((prevOptions: any) => ({
        ...prevOptions,
        ["isUnlimited" + title.charAt(0).toUpperCase() + title.slice(1)]:
          newUnlimitedValue,
      }));
      return newUnlimitedValue;
    });
  };

  useEffect(() => {
    if (resetForm) {
      setValue(defaultValue);
      setIsUnlimitedValue(false);
      setOptions((prevOptions: any) => ({
        ...prevOptions,
        [title]: defaultValue,
        ["isUnlimited" + title.charAt(0).toUpperCase() + title.slice(1)]: false,
      }));
    } else {
      setOptions({});
    }
  }, [resetForm]);

  return (
    <div className="rangeInput">
      <div className="rangeInput-title">
        <i className={icon}></i>
        <h4>{title}</h4>
      </div>
      <div className="rangeInput-value">
        <div
          style={{
            color: isUnlimitedValue ? "rgb(55, 55, 55) " : "",
          }}
          className="rangeInput-value-display"
        >
          <div>{value}</div>
        </div>
        <div className="rangeInput-value-range">
          <input
            className={isUnlimitedValue ? "range-inactive" : "range-active"}
            type="range"
            id="time-slider"
            min={minValue}
            max={maxValue}
            value={value}
            onChange={handleChangeValue}
            disabled={isUnlimitedValue}
            style={{
              background: `${
                isUnlimitedValue
                  ? "rgb(35, 35, 35)"
                  : `linear-gradient(to right, #242689 0%, #242689 ${
                      ((value - minValue) / (maxValue - minValue)) * 100
                    }%, #d0d0d0 ${
                      ((value - minValue) / (maxValue - minValue)) * 100
                    }%, #d0d0d0 100%)`
              }`,
            }}
          />
        </div>
        <div className="rangeInput-value-unlimited">
          <label
            style={{
              backgroundColor: isUnlimitedValue ? "#242689" : "#333",
            }}
          >
            <input
              type="checkbox"
              checked={isUnlimitedValue}
              onChange={handleChangeUnlimitedValue}
            />
            <i className="fa-solid fa-infinity"></i>
            <span>unlimited</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default RangeInput;
