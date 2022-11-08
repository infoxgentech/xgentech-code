import { NOTIFICATION_BAR_FRAGMENT } from 'graphql-cms/fragments'
import { fetchGraphQL } from '../api'

export const getNotificationBarSlug = async ({ slug }) => {
  const query = `query {
    notificationBarCollection(where: {slug: "${slug}" }, limit: 1)  {
      items {
        ${NOTIFICATION_BAR_FRAGMENT}
      }
    }
  }`

  const response = await fetchGraphQL(query)

  const notificationBar = response.data.notificationBarCollection.items
    ? response.data.notificationBarCollection.items[0].notification.slug
    : null

  return notificationBar
}

export const getNotifications = async () => {
  const response = await fetchGraphQL(`
    query {
      notificationCollection(limit: 20) {
        items {
          slug
          description
        }
      }
    }
  `)

  return response.data.notificationCollection.items ?? []
}

export const getDefaultNotificationsForApp = async () => {
  // Fetch the Notification Bar with their assoicated Notification
  const notificationBarSlug = await getNotificationBarSlug({
    slug: 'notification-bar'
  })
  // Fetch specialized Notifications
  const notifications = await getNotifications()

  return {
    bar: notificationBarSlug,
    notifications
  }
}
