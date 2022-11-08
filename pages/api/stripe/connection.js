import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SK_KEY, {
  apiVersion: '2020-08-27',
});

export default async function handler(req, res) {
  const connectionToken = await stripe.terminal.connectionTokens.create();
  res.status(200).json({ secret: connectionToken.secret })
}
