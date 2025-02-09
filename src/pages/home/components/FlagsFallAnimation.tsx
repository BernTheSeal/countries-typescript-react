import { useEffect, useState } from "react";
import useFlagAnimations from "../hooks/use-flagAnimatons";
import flagsConfig from "../config/flagsConfig";
import { flagImgType } from "../types/flagImgType";
import useFetchCountriesData from "../../../hooks/use-fetchCountriesData";
import useIsMobile from "../hooks/use-isMobile";
import { NavigateFunction, useNavigate } from "react-router-dom";
import CountryName from "./CountryName";

interface flagsFallAnimatonProps {
  isGreetingsActive: boolean;
}

const FlagsFallAnimation = ({ isGreetingsActive }: flagsFallAnimatonProps) => {
  const { flags, createFlag, deleteFlag, resumeFlag } = useFlagAnimations();
  const { countries } = useFetchCountriesData({});
  const { isMobile } = useIsMobile();
  const [hoverFlagId, setHoverFlagId] = useState<string | null>(null);
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    let intervalId: number | null = null;

    const startInterval = () => {
      if (!intervalId) {
        intervalId = setInterval(() => {
          createFlag(countries);
        }, flagsConfig.spawnInterval);
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

  const handleFlagInteraction = (
    action: "enter" | "leave" | "click",
    flagId?: string,
    flagName?: string
  ) => {
    if (isGreetingsActive) return;

    if (action === "enter") {
      setHoverFlagId(flagId!);
      if (flagId) {
        resumeFlag(flagId);
      }
    }

    if (action === "leave") {
      setHoverFlagId(null);
      if (flagId) {
        deleteFlag(flagId);
      }
    }

    if (action === "click") navigate(`/countries/${flagName}`);
  };

  return (
    <div className="flagsFallAnimation-container ">
      {flags.map((flag: flagImgType) => {
        const scale = isMobile
          ? flagsConfig.scale.mobile
          : isGreetingsActive
          ? flagsConfig.scale.normal
          : flagsConfig.scale.active;
        const width = flag.width * scale;
        const height = flag.height * scale;

        return (
          <div
            className="flagsFallAnimation-container-flag"
            style={{
              left: flag.left,
              right: flag.right,
              animationDuration: flag.animationDuration,
              zIndex:
                hoverFlagId == flag.id ? flagsConfig.hoverZIndex : flag.zIndex,
              animationPlayState: hoverFlagId == flag.id ? "paused" : "running",
              cursor: !isGreetingsActive ? "pointer" : "",
            }}
            key={flag.id}
            onMouseEnter={() => handleFlagInteraction("enter", flag.id)}
            onMouseLeave={() => handleFlagInteraction("leave", flag.id)}
            onClick={() =>
              handleFlagInteraction(
                "click",
                undefined,
                flag.countryProperties.name
              )
            }
          >
            {flag.id === hoverFlagId && (
              <CountryName
                name={flag.countryProperties.name}
                leftOrRight={flag.left ? "left" : "right"}
              />
            )}

            <div
              className={`flagsFallAnimation-container-flag-img ${
                hoverFlagId == flag.id ? "hoverActive" : "hoverInactive"
              }`}
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
            >
              <img src={flag.countryProperties.flag} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FlagsFallAnimation;
