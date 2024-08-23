import { useState, useRef } from "react"
import { clearInterval, setInterval } from 'worker-timers';

const useCountdownTimer = (gameTime: number) => {
    const initialTime = (gameTime * 10) + 10
    const intervalDuration = 100
    const countdownThreshold = 10
    const [time, setTime] = useState<number>(initialTime)
    const [displayTime, setDisplayTime] = useState<number>(gameTime);
    const intervalId = useRef<any>(null)

    const startTimeInterval = () => {
        if (intervalId.current) {
            clearInterval(intervalId.current)
        }

        intervalId.current = setInterval(() => {
            setTime(prev => {
                if (prev > countdownThreshold) {
                    const newTime = prev - 1
                    setDisplayTime(Math.floor(newTime / 10))
                    return newTime
                } else {
                    clearInterval(intervalId.current)
                    return 0
                }
            })
        }, intervalDuration);
    }

    const stopTimeInterval = () => {
        clearInterval(intervalId.current)
    }

    const resetTimeInterval = () => {
        setTime(initialTime);
        setDisplayTime(gameTime);
    }

    return { displayTime, time, startTimeInterval, stopTimeInterval, resetTimeInterval }
}

export default useCountdownTimer

