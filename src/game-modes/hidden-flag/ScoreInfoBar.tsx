import { FunctionComponent } from "react"
import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from "react-icons/md";

interface iScoreInfoBar {
    currentScore: number,
}

const ScoreInfoBar: FunctionComponent<iScoreInfoBar> = (props) => {
    const { currentScore } = props

    return (
        <div className="hf-game-score-info-bar">
            <div className="hf-game-score-info-bar-up">
                <MdKeyboardDoubleArrowUp fontSize="100px" color="#248939" />
                <span>+{currentScore === 10 ? `${currentScore * 2}` : `${currentScore}`}</span>
            </div>
            <div className="hf-game-score-info-bar-down">
                <MdKeyboardDoubleArrowDown fontSize="100px" fontWeight="bold" color="#b03535" />
                <span>-{(currentScore === 10) ? `${currentScore * 2 - 5}` : `${currentScore - 2}`}</span>
            </div>
        </div>
    )
}

export default ScoreInfoBar;
