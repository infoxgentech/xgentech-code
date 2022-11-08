const toUsdCurrency = number => {
  if (number % 1 === 0) return fraction.format(number)
  else return formatter.format(number)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const fraction = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

export { toUsdCurrency }
