/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import copy from 'copy-to-clipboard'
import { Box, Button, Card, Flex, Heading, Text } from 'theme-ui'
import { useTranslate } from '~/hooks'
import FormInputWithLabel from '~/components/Generic/Form/InputWithLabel'

const OrderConfirmationReferralPrompt = ({ purl = '' }) => {
  const translate = useTranslate()
  const { register, getValues } = useForm({ defaultValues: { purl } })
  const [copied, setCopied] = useState(false)

  const onCopy = e => {
    e.preventDefault()
    const values = getValues()
    copy(values.purl)
    setCopied(true)
  }

  return (
    <Card
      sx={{
        width: '100%',
        marginBottom: '1.5rem',
        padding: ['32px 18px', '2.5rem']
      }}
    >
      <Flex sx={{ flexDirection: 'column', textAlign: ['center', 'left'] }}>
        <Heading
          as="h3"
          variant="h3"
          sx={{ marginBottom: ['1.5rem', null, '3rem'] }}
        >
          {translate('referral.title')}
        </Heading>
        <Text variant="link" mb={['0.5rem', '1rem']}>
          {translate('referral.subtitle')}
        </Text>
        <Text mb="1.5rem">{translate('referral.text')}</Text>
      </Flex>
      <Flex as="form" sx={{ flexDirection: ['column', 'row'] }}>
        <Box sx={{ width: ['100%', '70%'] }} mb={['0.5rem', '0']}>
          <FormInputWithLabel
            ref={register}
            label={translate('referral.copy_link_input_label')}
            title={translate('referral.copy_link_input_label')}
            aria-label={translate('referral.copy_link_input_label')}
            name="purl"
            readOnly={true}
          />
        </Box>
        <Button
          onClick={onCopy}
          disabled={copied}
          sx={{ width: ['100%', '30%'], minWidth: '180px' }}
        >
          {copied
            ? translate('referral.copy_link_button_clicked')
            : translate('referral.copy_link_button')}
        </Button>
      </Flex>
    </Card>
  )
}

export default OrderConfirmationReferralPrompt
