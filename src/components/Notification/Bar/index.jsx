/** @jsxImportSource theme-ui */
import { Box, Flex } from 'theme-ui'
import Link from '~/components/Generic/Link'
import { useNotificationBar } from '~/hooks'

const NotificationBar = () => {
  const { loaded, notification } = useNotificationBar()
  if (!notification) return null

  const content = (
    <Flex
      sx={{
        alignItems: 'center',
        backgroundColor: 'altBackground',
        minHeight: ['40px', null, '40px'],
        textAlign: 'center',
        justifyContent: 'space-around',
        variant: 'text.link',
        fontSize: 12
      }}
    >
      <Box sx={{ opacity: loaded ? '1' : '0' }, {fontSize: 12} }>{notification.description}</Box>
    </Flex>
  )

  return notification.href ? (
    <Link href={notification.href}>{content}</Link>
  ) : (
    content
  )
}

export default NotificationBar
