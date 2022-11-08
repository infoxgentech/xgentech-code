import useSWR from 'swr'
import axios from 'axios'

const API_URL = process.env.CHORD_OMS_API_URL || ''

const fetcher = url => axios.get(url).then(res => res.data)

const useVariantAvailability = ({ sku }) => {
  const baseURL = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL

  const query = `${baseURL}/api/variants/${sku}/stock_availabilities`

  const { data, error } = useSWR(query, fetcher)

  // Start by assuming that the product is available. And if something
  // wrong happened in this hook, worse case scenario, it will be handled
  // by Chord's checkout.
  return {
    isAvailable: data ? data.in_stock || data.is_backorderable : true,
    isFetchingAvailability: !error && !data,
    error: error
  }
}

export default useVariantAvailability
