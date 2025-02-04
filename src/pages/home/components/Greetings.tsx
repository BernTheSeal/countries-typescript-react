import { useEffect, useState } from "react";
import greetingsConfig from "../config/greetingsConfig";
import { greetingsAnimationType } from "../types/greetingsAnimationType";
import { useNavigate, NavigateFunction } from "react-router-dom";

const Greetings = () => {
  const navigate: NavigateFunction = useNavigate();
  const { initialDelay, incrementalDelay } = greetingsConfig;
  const [titleAnimation, SetTitleAnimation] = useState<greetingsAnimationType>(
    greetingsConfig.titleAnimation
  );

  const [explanationAnimation, setExplanationAnimation] =
    useState<greetingsAnimationType>(greetingsConfig.explanationAnimation);

  const [buttonAnimation, setButtonAnimation] =
    useState<greetingsAnimationType>(greetingsConfig.buttonAnimation);

  useEffect(() => {
    const animations = [
      { setter: SetTitleAnimation, delay: initialDelay },
      {
        setter: setExplanationAnimation,
        delay: initialDelay + incrementalDelay,
      },
      {
        setter: setButtonAnimation,
        delay: initialDelay + incrementalDelay * 2,
      },
    ];

    animations.forEach(({ setter, delay }) => {
      setTimeout(() => {
        setter({
          translate: 0,
          opacity: 1,
        });
      }, delay);
    });
  }, []);

  return (
    <div className="greetings-container">
      <div className="greetings-container-title">
        <h2
          style={{
            transform: `translateY(${titleAnimation.translate}px)`,
            opacity: `${titleAnimation.opacity}`,
          }}
        >
          welcome to the Earth Explorer
        </h2>
        <p
          style={{
            transform: `translateY(${explanationAnimation.translate}px)`,
            opacity: `${explanationAnimation.opacity}`,
          }}
        >
          Explore countries and their fascinating details through interactive
          games! Earth Explorer not only lets you discover general information
          about countries but also challenges your knowledge with fun games.
          Test your memory, learn about flags, capitals, populations, and more
          as you engage in different games designed to improve your knowledge of
          the world’s countries!
        </p>
      </div>

      <div className="greetings-container-buttons">
        <button
          onClick={() => navigate("/countries")}
          style={{
            transform: `translateX(-${buttonAnimation.translate}px)`,
            opacity: `${buttonAnimation.opacity}`,
          }}
        >
          countries
        </button>
        <button
          onClick={() => navigate("/games")}
          style={{
            transform: `translateX(${buttonAnimation.translate}px)`,
            opacity: `${buttonAnimation.opacity}`,
          }}
        >
          games
        </button>
      </div>
    </div>
  );
};

export default Greetings;
