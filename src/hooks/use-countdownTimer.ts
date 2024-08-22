import { useState, useRef } from "react"
import { clearInterval, setInterval } from 'worker-timers';

const useCountdownTimer = (gameTime: number) => {
    const initialTime = (gameTime * 10) + 10
    const intervalDuration = 100
    const countdownThreshold = 10
    const [time, setTime] = useState<number>(initialTime)
    const [displayTime, setDisplayTime] = useState<number>(gameTime);
    const [isTimeUp, setIsTimeUp] = useState<boolean>(false)
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
                    setIsTimeUp(true)
                    return 0
                }
            })
        }, intervalDuration);
    }

    const stopTimeInterval = () => {
        clearInterval(intervalId.current)
    }

    const resetTimeInterval = () => {
        if (isTimeUp) {
            setIsTimeUp(false)
        }
        setTime(initialTime)
    }

    return { displayTime, isTimeUp, startTimeInterval, stopTimeInterval, resetTimeInterval }
}

export default useCountdownTimer