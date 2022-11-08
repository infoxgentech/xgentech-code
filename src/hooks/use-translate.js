import { useIntl } from 'react-intl'

export const useTranslate = () => {
  const { formatMessage } = useIntl()
  return (id, values) => formatMessage({ id }, values)
}
