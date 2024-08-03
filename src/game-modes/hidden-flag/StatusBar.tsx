import { FunctionComponent } from "react"

interface iStatusBarProps {
    name: string,
    count: number,
    maxValue: number,
    color: string,
    icon: string
}

const StatusBar: FunctionComponent<iStatusBarProps> = (props) => {
    const { name, count, maxValue, color, icon } = props

    const calculateWidth = (count: number, maxValue: number): string => {
        return `${(count / maxValue) * 100}%`;
    };

    return (
        <div className="hf-game-status-bar">
            <div className="hf-game-status-bar-icon">
                <i style={{ color: `${color}` }} className={icon}></i>
            </div>
            <div className="hf-game-status-bar-value">
                <div className="hf-game-status-bar-value-name">
                    <span>{name}</span>
                    <span>{count}</span>
                </div>
                <div className="hf-game-status-bar-value-count" >
                    <div style={{ backgroundColor: `${color}`, width: `${calculateWidth(count, maxValue)}`, height: '100%' }}>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default StatusBar
