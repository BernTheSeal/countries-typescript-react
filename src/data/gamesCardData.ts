import { GamesInformation } from "../types/gamesCardType";
import FlagMatchOptionsForm from "../pages/games/games-options-forms/FlagMatchOptionsForm";
import HiddenFlagOptionsForm from "../pages/games/games-options-forms/HiddenFlagOptionsForm";
import PopulationShowdownOptionsForm from "../pages/games/games-options-forms/PopulationShowdownOptionsForm";
import gameInfoData from "./gameInfoData";
import { flags, population } from "./gameContentData";

function getData(storageName: string) {
  const games = JSON.parse(localStorage.getItem("gamesData") || "{}");
  const gameInfo = games[storageName] || gameInfoData;
  return gameInfo;
}

const gamesData: GamesInformation[] = [
  {
    id: 0,
    name: "Population Showdown",
    navigate: "/games/populationShowdown",
    formComponent: PopulationShowdownOptionsForm,
    storageName: "populationShowdownGameInfo",
    getStorageData: function () {
      return getData(this.storageName);
    },
    gameContent: [population],
    difficulty: "easy",
    difficultyBar: 4,
    difficultyColor: "#248939",
  },
  {
    id: 1,
    name: "Flag Match",
    navigate: "/games/flagMatch",
    formComponent: FlagMatchOptionsForm,
    storageName: "flagMatchGameInfo",
    getStorageData: function () {
      return getData(this.storageName);
    },
    gameContent: [flags],
    difficulty: "medium",
    difficultyBar: 6,
    difficultyColor: "#acb035",
  },
  {
    id: 2,
    name: "Hidden Flag",
    navigate: "/games/hiddenFlag",
    formComponent: HiddenFlagOptionsForm,
    storageName: "hiddenFlagGameInfo",
    getStorageData: function () {
      return getData(this.storageName);
    },
    gameContent: [flags],
    difficulty: "hard",
    difficultyBar: 8,
    difficultyColor: "#b03535",
  },
];

export default gamesData;
