const mockedCartAfterCheckout = {
  number: 'R234523993',
  shipment: {
    id: 35,
    number: 'H25223324570',
    shippingMethods: [
      {
        id: 35,
        name: 'Free shipping',
        code: 'free_shipping',
        cost: '$0.00',
        selected: true
      }
    ]
  },
  email: 'leslie@chord.co',
  displayTotal: '$38.40',
  currency: 'USD',
  lineItems: [
    {
      id: 265,
      sku: 'antiperspirant',
      name: 'Antiperspirant',
      price: '$12.00',
      quantity: 4,
      totalPrice: '$48.00',
      image:
        'https://arfa-oms.s3.amazonaws.com/acs/public/spree/products/4/large/body-powder.png?1576165801'
    }
  ],
  displayItemTotal: '$48.00',
  displayTaxTotal: '$0.00',
  displayShipTotal: '$0.00',
  itemCount: 4,
  shippingAddress: {
    fullName: 'Leslie Passante',
    firstName: 'Leslie',
    lastName: 'Passante',
    streetAddress: '187 Lafayette Street',
    aptFloorSuite: 'Floor 6',
    city: 'New York',
    country: { id: 233, iso: 'US' },
    zipCode: '10013',
    phoneNumber: '2523396365',
    state: { id: 3390, abbr: 'NY' }
  },
  promoCodes: [{ value: 'Promotion (free state of)', displayAmount: '-$9.60' }]
}

export default mockedCartAfterCheckout
