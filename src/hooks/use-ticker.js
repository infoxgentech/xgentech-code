import { useEffect, useState } from 'react'
import isBefore from 'date-fns/isBefore'
import intervalToDuration from 'date-fns/intervalToDuration'

export const useTicker = futureDate => {
  const [now, setNow] = useState(new Date())
  const isTimeUp = isBefore(futureDate, now)

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    if (isTimeUp) {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [futureDate, isTimeUp])

  if (isTimeUp) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp }
  }

  const { days, hours, minutes, seconds } = intervalToDuration({
    start: now,
    end: futureDate
  })

  return { days, hours, minutes, seconds, isTimeUp }
}
