import { useContext, useMemo } from 'react'
import { useUser } from '@chordcommerce/react-autonomy'

import NotificationsContext from '~/context/notifications'
import { getParam } from '~/utils/url'

const useNotificationBar = () => {
  const { notifications, bar } = useContext(NotificationsContext)
  const { user } = useUser()
  const availableGiftCards = user?.data?.availableGiftCards
  const showRefNotification = !!getParam('ref')
  const notification = useMemo(() => {
    const defaultNotification = notifications?.find(
      notification => notification.slug === bar
    )

    if (showRefNotification) {
      const referralNotification = notifications.find(
        notification => notification.slug === 'referral'
      )

      if (referralNotification) {
        return referralNotification
      }
    }

    if (availableGiftCards?.length) {
      const giftCardAmount = availableGiftCards.reduce(
        (total, giftCard) => total + giftCard.amount,
        0
      )

      return {
        name: 'Gift Card',
        slug: 'gift-card',
        description: `Hooray, you have a $${giftCardAmount} gift remaining! Shop now`,
        href: '/shop'
      }
    }

    return defaultNotification
  }, [availableGiftCards, showRefNotification, notifications, bar])

  return {
    loaded: true,
    notification
  }
}

export default useNotificationBar
