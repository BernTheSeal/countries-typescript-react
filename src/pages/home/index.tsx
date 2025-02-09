import { useState } from "react";
import Header from "../../components/Header";
import FlagsFallAnimation from "./components/FlagsFallAnimation";
import Greetings from "./components/Greetings";
import HideGreetingsButton from "./components/HideGreetingsButton";

const Home = () => {
  const [isGreetingsActive, setIsGreetingsActive] = useState<boolean>(true);

  return (
    <div className="Home">
      <Header onPage={"home"} />
      <HideGreetingsButton
        isGreetingActive={isGreetingsActive}
        setIsGreetingsActive={setIsGreetingsActive}
      />
      <Greetings isGreetingsActive={isGreetingsActive} />
      <FlagsFallAnimation isGreetingsActive={isGreetingsActive} />
    </div>
  );
};

export default Home;
