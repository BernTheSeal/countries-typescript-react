import { useEffect, useRef, useState } from "react";
import flagsConfig from "../config/flagsConfig";

interface countryNameProps {
  name: string;
  leftOrRight: string;
}

const CountryName = ({ name, leftOrRight }: countryNameProps) => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [topOrBottom, setTopOrBottom] = useState<string>("");

  useEffect(() => {
    if (divRef.current) {
      const divTop = divRef.current.getBoundingClientRect().top;
      const windowCenter =
        window.innerHeight / 2 - flagsConfig.windowCenterOffset;

      setTopOrBottom(() => {
        return divTop < windowCenter ? "bottom" : "top";
      });
    }
  }, []);

  return (
    <div
      ref={divRef}
      className="countryName-container"
      style={{
        [leftOrRight]: "0",
        [topOrBottom]: flagsConfig.hoverOffset,
      }}
    >
      {name}
    </div>
  );
};

export default CountryName;
