import { toUsdCurrency } from './../formatters'

const eligibleOrderPromotion = adjustment => {
  return (
    adjustment.sourceType === 'Spree::PromotionAction' &&
    adjustment.adjustableType === 'Spree::Order' &&
    adjustment.eligible
  )
}

const eligibleLineItemPromotion = adjustment => {
  return (
    adjustment.sourceType === 'Spree::PromotionAction' &&
    adjustment.adjustableType === 'Spree::LineItem' &&
    adjustment.eligible
  )
}

const getOrderPromotions = order => {
  if (!order.adjustments || order.adjustments.length === 0) return []

  return order.adjustments.filter(a => eligibleOrderPromotion(a))
}

const getLineItemPromotions = order => {
  if (!order.lineItems || order.lineItems.length === 0) return []

  return order.lineItems.reduce((acc, lineItem) => {
    const eligiblePromotions = lineItem.adjustments.filter(a =>
      eligibleLineItemPromotion(a)
    )
    return acc.concat(eligiblePromotions)
  }, [])
}

const getAllCartPromotions = order => {
  if (!order) return []

  const orderPromotions = getOrderPromotions(order)
  const lineItemPromotions = getLineItemPromotions(order)

  return [...orderPromotions, ...lineItemPromotions]
}

const getAllCartPromotionsForDisplay = order => {
  const promotions = getAllCartPromotions(order)

  const groupedPromos = promotions.reduce(
    (acc, { promotionCodeId, label, amount, promotionCode }) => {
      acc[promotionCodeId] = acc[promotionCodeId] || {
        label: label,
        amount: 0,
        code: promotionCode ? promotionCode.value : null
      }
      acc[promotionCodeId].amount += parseFloat(amount)
      return acc
    },
    {}
  )

  return Object.entries(groupedPromos).map(
    ([key, { label, amount, code }]) => ({
      id: key,
      label: label,
      amount: amount,
      displayAmount: toUsdCurrency(amount),
      code: code ? code.toUpperCase() : null
    })
  )
}

export { getAllCartPromotionsForDisplay }
