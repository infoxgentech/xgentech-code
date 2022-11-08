import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
  apiVersion: '2020-08-27'
})

async function getOrder(orderNumber) {
  if (!orderNumber) throw new Error('Invalid order number.')
  const response = await fetch(
    `${process.env.CHORD_OMS_API_URL}/api/orders/${orderNumber}`,
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

export default async function handler(req, res) {
  const orderNumber = req.body.orderNumber
  const order = await getOrder(orderNumber)

  if (!order.id) {
    return res.status(400).json({ error: 'Error getting order from Chord.' })
  }

  const intent = await stripe.paymentIntents.create({
    amount: parseFloat(order?.total) * 100,
    currency: 'usd',
    payment_method_types: ['card', 'card_present'],
    capture_method: 'manual',
    metadata: req.body.metadata
  })

  res.status(200).json({ client_secret: intent.client_secret })
}
