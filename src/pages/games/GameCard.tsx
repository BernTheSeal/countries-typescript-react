import { FunctionComponent } from "react";

interface iGameCardProps {
    title: string;
    openGameMenu: () => void;
}

const GameCard: FunctionComponent<iGameCardProps> = (props) => {
    const { title, openGameMenu } = props
    return (
        <div className="game-card" onClick={openGameMenu}>
            <p>{title}</p>
        </div>
    )
}

export default GameCard
