import React, { FunctionComponent } from "react"

interface iGameInfoProps {
    children: React.ReactNode,
    positionFrom: "left" | "right",
    distanceInPx: number;
}

const GameInfo: FunctionComponent<iGameInfoProps> = (props) => {
    const { children, positionFrom, distanceInPx } = props
    return (
        <div className="hf-game-gameInfo" style={{ [positionFrom]: `${distanceInPx}px` }}>
            {children}
        </div>
    )
}

export default GameInfo
