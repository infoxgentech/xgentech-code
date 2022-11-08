/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { Box, Flex, Heading } from 'theme-ui'
import CloseIcon from '~/assets/images/icons/close.svg'
import ReactMarkdown from 'react-markdown'

const ContentFaqQuestion = ({ faq }) => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      sx={{
        borderColor: 'primary',
        border: '1px solid',
        borderTop: 'none',
        overflow: 'hidden',
        ':first-child': {
          borderTop: '1px solid'
        }
      }}
    >
      <Flex
        onClick={() => setOpen(!open)}
        sx={{
          cursor: 'pointer',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: ['1rem', null, '1rem 2.5rem']
        }}
      >
        <Heading
          as="h3"
          sx={{ paddingRight: '1rem', variant: ['text.h4', null, 'text.h3'] }}
        >
          {faq.question}
        </Heading>
        <Flex
          sx={{
            alignItems: 'center',
            height: ['25px', null, '40px'],
            flexShrink: 0
          }}
        >
          <CloseIcon
            sx={{
              transform: open ? 'rotate(45deg)' : 'none',
              transition: 'transform 100ms ease-in-out'
            }}
          />
        </Flex>
      </Flex>
      <Box
        sx={{
          display: open ? 'block' : 'none',
          padding: ['0 1rem', null, '0 2.5rem']
        }}
      >
        <ReactMarkdown>{faq.answer}</ReactMarkdown>
      </Box>
    </Box>
  )
}

export default ContentFaqQuestion
