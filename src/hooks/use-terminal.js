import { loadStripeTerminal } from '@stripe/terminal-js'
import { useEffect, useState } from 'react'
import { useCart } from '@chordcommerce/react-autonomy'

export function useTerminal() {
  const [terminal, setTerminal] = useState(null)
  const [location, _setLocation] = useState(null)
  const [locations, setLocations] = useState([])
  const [readers, setReaders] = useState(null)
  const [readerStatus, setReaderStatus] = useState('not_connected')
  const [displayStatus, setDisplayStatus] = useState(null)
  const [connectedReader, setConnectedReader] = useState(null)
  const { loadCart } = useCart()

  const fetchConnectionToken = async () => {
    const response = await fetch('/api/stripe/connection', { method: 'POST' })
    const data = await response.json()
    return data.secret
  }

  const connectionStatusChange = ({ status }) => {
    setDisplayStatus(`Reader connection status changed to ${status}.`)
    setReaderStatus(status)
    if (status === 'not_connected')
      setDisplayStatus('Select a reader to connect to.')
  }

  const unexpectedDisconnect = () => {
    setDisplayStatus('Disconnected from reader.')
    setConnectedReader(null)
  }

  const setLocation = location => {
    _setLocation(location)

    // Handle case where user resets location.
    if (!location) {
      setDisplayStatus('Select a location.')
      return delete localStorage.lastLocation
    }

    console.debug('Saving location in local storage.')
    localStorage.lastLocation = location.id
  }

  const connectToReader = async reader => {
    if (!terminal) return
    const connectResult = await terminal.connectReader(reader)
    if (connectResult.error) {
      console.error('Failed to connect: ', connectResult.error)
      setDisplayStatus('Failed to connect to reader.')
    } else {
      setDisplayStatus(`Connected to reader - ${connectResult.reader.label}.`)
      setConnectedReader(connectResult.reader)

      console.debug('Saving reader in local storage.')
      localStorage.lastConnectedReader = connectResult.reader.id
    }
  }

  const disconnectReader = async () => {
    if (!terminal) return
    setDisplayStatus('Disconnecting from reader.')
    await terminal.disconnectReader()
    setConnectedReader(null)
    delete localStorage.lastConnectedReader
  }

  const updateOrder = async (orderNumber, email) => {
    const body = JSON.stringify({ orderNumber, email, locationId: location.id })
    const response = await fetch('/api/stripe/update-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const data = await response.json()

    // Reload the cart to get new totals.
    await loadCart()

    if (!terminal) return data

    // Set terminal cart display.
    await terminal.setReaderDisplay({
      type: 'cart',
      cart: {
        line_items: data.line_items.map(lineItem => ({
          description:
            lineItem?.variant?.description || lineItem?.variant?.name,
          amount: parseFloat(lineItem.price) * 100,
          quantity: lineItem.quantity
        })),
        tax: parseFloat(data.tax_total) * 100,
        total: parseFloat(data.total) * 100,
        currency: data.currency
      }
    })

    return data
  }

  const createPaymentIntent = async orderNumber => {
    const body = JSON.stringify({
      orderNumber,
      metadata: {
        order_number: orderNumber,
        location_id: location.id,
        reader_location: connectedReader.location,
        reader_serial_number: connectedReader.serial_number,
        reader_id: connectedReader.id,
        reader_device_type: connectedReader.device_type
      }
    })
    const response = await fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const data = await response.json()
    return data.client_secret
  }

  const capturePaymentIntent = async (id, orderNumber) => {
    const response = await fetch('/api/stripe/capture-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, orderNumber })
    })

    const data = await response.json()

    if (response.ok) {
      setDisplayStatus('Payment successful.')
      return
    }

    setDisplayStatus(`Error - ${data.message}`)
  }

  const collectPayment = async orderNumber => {
    const clientSecret = await createPaymentIntent(orderNumber)

    // Uncomment this line to simulate a failed payment.
    // terminal.setSimulatorConfiguration({ testCardNumber: '1234' });

    setDisplayStatus('Waiting for customer.')
    const result = await terminal.collectPaymentMethod(clientSecret)

    if (result.error) {
      setDisplayStatus(`Error - ${result.error.message}`)
      console.error('Error collecting payment method', result.error)
      return
    }

    setDisplayStatus('Processing payment.')
    const response = await terminal.processPayment(result.paymentIntent)

    if (response.error) {
      setDisplayStatus(`Error - ${response.error.message}`)
      console.error('Error occurred while processing payment', response.error)
      return
    }

    const paymentIntentId = response.paymentIntent.id

    await capturePaymentIntent(paymentIntentId, orderNumber)

    // Reload the cart to get new statuses.
    await loadCart()
  }

  useEffect(() => {
    const loadTerminal = async () => {
      setDisplayStatus('Initializing Stripe Terminal.')
      const StripeTerminal = await loadStripeTerminal()
      setTerminal(
        StripeTerminal.create({
          onFetchConnectionToken: fetchConnectionToken,
          onUnexpectedReaderDisconnect: unexpectedDisconnect,
          onConnectionStatusChange: connectionStatusChange
        })
      )
      setDisplayStatus('Done initializing Stripe Terminal.')
    }

    loadTerminal()
  }, [])

  useEffect(() => {
    const discoverReaders = async () => {
      // Return early if the client is already connected to a reader.
      if (terminal.connectionStatus === 'connected') return

      setDisplayStatus('Discovering readers.')
      const config = {
        simulated: process.env.SIMULATED_TERMINAL_ENABLED === 'true',
        location: location.id
      }
      const response = await terminal.discoverReaders(config)
      if (response.error) {
        setDisplayStatus('Failed to fetch readers.')
        console.error(`Failed to fetch readers: ${response.error}`)
        return
      }

      if (response.discoveredReaders.length === 0) {
        return setDisplayStatus('No available readers.')
      }

      setReaders(response.discoveredReaders)
      setDisplayStatus(
        `Discovered ${response.discoveredReaders.length} reader(s).`
      )

      console.debug('Checking local storage for last connected reader.')
      const lastConnectedReaderId = localStorage.lastConnectedReader

      setDisplayStatus('Checking if last connected reader is available.')
      const lastConnectedReader = response.discoveredReaders.find(
        reader =>
          reader.id === lastConnectedReaderId &&
          (reader.location === 'st_simulated' ||
            reader.location?.id === location.id)
      )
      if (lastConnectedReader) {
        console.debug(
          'Last connected reader available. ID',
          lastConnectedReader.id
        )
        setDisplayStatus(
          'Last connected reader is available. Attempting to connect.'
        )
        return await connectToReader(lastConnectedReader)
      }

      setDisplayStatus('Last connected reader is unavailable.')
      setDisplayStatus(
        `Select from available readers at ${location.display_name}`
      )
    }

    if (location) discoverReaders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    const discoverLocations = async () => {
      console.debug('Discovering locations.')

      const response = await fetch('/api/stripe/list-locations', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      const locations = await response.json()

      if (!Array.isArray(locations) || locations.length === 0) {
        return setDisplayStatus('No available locations.')
      }

      setLocations(locations)

      console.debug('Checking local storage for last set location.')
      const lastLocationId = localStorage.lastLocation

      setDisplayStatus('Checking if last set location is available')
      const lastLocation = locations.find(
        location => location.id === lastLocationId
      )

      if (lastLocation) {
        console.debug('Last location available. ID', lastLocation.id)
        setDisplayStatus('Last location available.')
        return setLocation(lastLocation)
      }

      setDisplayStatus('Select a location.')
    }

    if (terminal && (!Array.isArray(locations) || locations.length === 0))
      discoverLocations()
  }, [terminal, locations])

  return {
    terminal,
    readers,
    readerStatus,
    displayStatus,
    connectedReader,
    location,
    locations,
    collectPayment,
    connectToReader,
    disconnectReader,
    updateOrder,
    setLocation
  }
}
