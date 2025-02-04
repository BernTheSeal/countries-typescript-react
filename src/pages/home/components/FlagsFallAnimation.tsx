import { useEffect, useState } from "react";
import createRandomFlag from "../hooks/use-createRandomFlag";
import flagsConfig from "../config/flagsConfig";
import { flagImgType } from "../types/flagImgType";
import useFetchCountriesData from "../../../hooks/use-fetchCountriesData";

const FlagsFallAnimation = () => {
  const { flags, createFlag } = createRandomFlag();
  const { spawnInterval } = flagsConfig;
  const { countries } = useFetchCountriesData({});

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    let intervalId: number | null = null;

    const startInterval = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          createFlag(countries);
        }, spawnInterval);
      }
    };

    const stopInterval = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopInterval();
      } else {
        startInterval();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    startInterval();

    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [countries]);

  return (
    <div className="flagsFallAnimation">
      {flags.map((flag: flagImgType) => {
        const scale = isMobile ? 0.6 : 1;

        const width = flag.width * scale;
        const height = flag.height * scale;

        return (
          <div
            style={{
              left: flag.left,
              right: flag.right,
              animationDuration: flag.animationDuration,
              width: `${width}px`,
              height: `${height}px`,
              zIndex: flag.zIndex,
            }}
            className="flagsFallAnimation-flag"
            key={flag.id}
          >
            <img src={flag.img} />
          </div>
        );
      })}
    </div>
  );
};

export default FlagsFallAnimation;
