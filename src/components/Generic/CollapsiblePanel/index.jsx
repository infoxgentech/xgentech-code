/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Box, Flex, Text } from 'theme-ui'

import CloseIcon from '~/assets/images/icons/close.svg'

const CollapsiblePanel = ({
  title,
  titleColor = 'primary',
  children,
  initiallyCollapsed = true
}) => {
  const [collapsed, setCollapsed] = useState(initiallyCollapsed)
  const toggleCollapse = () => setCollapsed(!collapsed)

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        width: '100%'
      }}
      onClick={toggleCollapse}
    >
      <Box
        sx={{
          margin: ['12px 16px', '16px 20px'],
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          '&:focus': {
            outline: 'none'
          }
        }}
      >
        <Text
          variant="link"
          sx={{
            color: titleColor,
            marginTop: ['4px', '8px'],
            marginBottom: ['4px', '8px'],
            width: ['calc(100% - 16px)', null, 'calc(100% - 24px)'],
            display: 'inline-block',
            textAlign: 'left'
          }}
        >
          {title}
        </Text>

        <CloseIcon
          sx={{
            position: 'relative',
            right: '0',
            transform: collapsed ? 'none' : 'rotate(45deg)',
            transition: 'transform 100ms ease-in-out'
          }}
        />
      </Box>
      <Box
        sx={{
          overflow: 'hidden',
          maxHeight: collapsed ? 0 : '2000px',
          marginRight: '10px',
          marginLeft: '10px'
        }}
      >
        <Text
          sx={{
            variant: 'text.small',
            color: titleColor,
            paddingLeft: ['16px'],
            paddingRight: ['16px'],
            textAlign: 'left'
          }}
        >
          {children}
        </Text>
      </Box>
    </Flex>
  )
}

export default CollapsiblePanel
