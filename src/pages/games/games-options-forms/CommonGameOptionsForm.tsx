import {
  ChangeEvent,
  FC,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

interface GameOptions {
  regions?: string[];
  endlessMode?: boolean;
}

interface commonGameOptionsFormProps {
  setOptions: Dispatch<SetStateAction<GameOptions>>;
  resetForm: boolean;
}

const CommonGameOptionsForm: FC<commonGameOptionsFormProps> = ({
  setOptions,
  resetForm,
}) => {
  const [regions, setRegions] = useState<string[]>([]);

  const regionsData = [
    "Asia",
    "Africa",
    "Americas",
    "Europe",
    "Antarctic",
    "Oceania",
  ];

  const handleCommonGameOptionsChange = (regions?: string[]) => {
    setOptions((prev) => {
      const updatedOptions = { ...prev };
      if (regions && regions.length > 0) {
        updatedOptions.regions = regions;
      } else {
        delete updatedOptions.regions;
      }

      return updatedOptions;
    });
  };

  const handleChangeRegion = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedRegion = e.target.value;
    setRegions((prevRegions) => {
      if (!prevRegions.includes(selectedRegion)) {
        const updatedRegions = [...prevRegions, selectedRegion];
        return updatedRegions;
      } else {
        const updatedRegions = prevRegions.filter((region: string) => {
          return region !== selectedRegion;
        });
        return updatedRegions;
      }
    });
  };

  useEffect(() => {
    handleCommonGameOptionsChange(regions);
  }, [regions]);

  useEffect(() => {
    setRegions([]);
  }, [resetForm]);

  return (
    <form className="commonGameOptionsForm">
      <div className="commonGameOptionsForm-container">
        <div className="commonGameOptionsForm-container-title">
          <i className="fa-solid fa-earth-americas"></i>
          <h4>regions</h4>
        </div>
        <div className="commonGameOptionsForm-container-regions">
          {regionsData
            .sort((a, b) => a.localeCompare(b))
            .map((region: string, index) => (
              <label
                className={`${
                  regions.includes(region) ? "active" : "inactive"
                }`}
                key={index}
              >
                <input
                  type="checkbox"
                  value={region}
                  checked={regions.includes(region)}
                  onChange={handleChangeRegion}
                />
                {region}
              </label>
            ))}
        </div>
      </div>
    </form>
  );
};

export default CommonGameOptionsForm;
