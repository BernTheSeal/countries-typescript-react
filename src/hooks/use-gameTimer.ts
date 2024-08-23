import { useState } from "react"

const useGameTimer = () => {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState<number>(0)

  const startTimer = () => {
    setStartTime(Date.now())
  }

  const stopTimer = () => {
    if (startTime !== null) {
      const endTime = Date.now()
      const timeSpent = endTime - startTime
      const timeSpentSecond = Math.floor(timeSpent / 1000)
      setElapsedTime(timeSpentSecond)
    }
  }

  const resetTimer = () => {
    setStartTime(null)
    setElapsedTime(0)
  }

  return { startTimer, stopTimer, resetTimer, elapsedTime }
}

export default useGameTimer