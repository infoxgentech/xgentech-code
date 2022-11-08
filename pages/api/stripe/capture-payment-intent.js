import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
  apiVersion: '2020-08-27'
})

async function advanceCheckout(orderNumber) {
  if (!orderNumber) throw new Error('Invalid order number.')
  const response = await fetch(
    `${process.env.CHORD_OMS_API_URL}/api/checkouts/${orderNumber}/advance`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHORD_OMS_API_KEY}`
      }
    }
  )
  return await response.json()
}

export default async function handler(req, res) {
  const intent = await stripe.paymentIntents.capture(req.body.id)
  const orderNumber = req.body.orderNumber

  if (intent?.status !== 'succeeded') {
    res
      .status(400)
      .json({ error: `Response returned with status ${intent?.status}` })
  }

  // Advance the order status.
  await advanceCheckout(orderNumber)

  res.status(200).json(intent)
}
