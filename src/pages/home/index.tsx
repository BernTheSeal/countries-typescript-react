import Header from "../../components/Header";
import FlagsFallAnimation from "./components/FlagsFallAnimation";
import Greetings from "./components/Greetings";

const Home = () => {
  return (
    <div className="Home">
      <Header onPage={"home"} />
      <Greetings />
      <FlagsFallAnimation />
    </div>
  );
};

export default Home;
