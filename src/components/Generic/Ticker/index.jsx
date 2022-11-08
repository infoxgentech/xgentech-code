import { Text } from 'theme-ui'
import formatDuration from 'date-fns/formatDuration'
import { useTicker } from '~/hooks'

export const Ticker = ({ futureDate, styles }) => {
  const duration = useTicker(futureDate)
  return (
    <Text sx={styles}>
      {formatDuration(duration, {
        delimiter: ', '
      })}
    </Text>
  )
}

export default Ticker
