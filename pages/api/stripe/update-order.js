import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
  apiVersion: '2020-08-27'
})

async function getCountry(isoCode) {
  const response = await fetch(
    `${process.env.CHORD_OMS_API_URL}/api/countries/${isoCode}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHORD_OMS_API_KEY}`
      }
    }
  )
  return await response.json()
}

async function getStripeLocation(locationId) {
  if (!locationId) throw new Error('Invalid location ID.')
  return await stripe.terminal.locations.retrieve(locationId)
}

async function updateOrder(orderNumber, properties) {
  if (!orderNumber) throw new Error('Invalid order number.')
  const response = await fetch(
    `${process.env.CHORD_OMS_API_URL}/api/orders/${orderNumber}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHORD_OMS_API_KEY}`
      },
      body: JSON.stringify(properties)
    }
  )
  const data = await response.json()

  if (data?.status > 200)
    throw new Error(data?.error || 'Error occurred while updating order.')

  return data
}

export default async function handler(req, res) {
  const locationId = req.body.locationId
  const orderNumber = req.body.orderNumber
  const email = req.body.email

  if (!orderNumber) {
    return res.status(400).json({ error: 'Invalid order number.' })
  }

  if (!locationId) {
    return res.status(400).json({ error: 'Invalid location ID.' })
  }

  const location = await getStripeLocation(locationId)

  if (location?.id !== locationId) {
    return res
      .status(400)
      .json({ error: 'Error getting location from Stripe.' })
  }

  const country = await getCountry(location.address.country)
  const state = country?.states?.find(
    state => state?.abbr === location.address.state
  )

  if (!country || !state) {
    return res.status(400).json({
      error: 'Error mapping Stripe location object to a state and/or country.'
    })
  }

  const order = await updateOrder(orderNumber, {
    email,
    use_billing: false,
    ship_address_attributes: {
      address1: location.address.line1,
      address2: location.address.line2,
      zipcode: location.address.postal_code,
      state_id: state.id,
      city: location.address.city,
      name: location.display_name,
      country_id: country.id,
      company: location.display_name,
      phone: '555-555-5555'
    }
  })

  res.status(200).json(order)
}
