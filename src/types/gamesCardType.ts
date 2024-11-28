import { ComponentType, Dispatch , SetStateAction } from "react";

export interface formComponentProps {
    setOptions :Dispatch<SetStateAction<any>>
    resetForm: boolean
}

export interface gameContent {
    content: string
    icon: string
}

export interface GamesInformation {
    id: number,
    name: string,
    navigate: string,
    formComponent: ComponentType<formComponentProps>,
    storageName: string,
    getStorageData: ()=> any;
    gameContent: gameContent[],
    difficulty: "easy" | "medium" | "hard",
    difficultyBar: number,
    difficultyColor: string
}