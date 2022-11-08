/** @jsxImportSource theme-ui */
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Box, Button, Flex, Heading, Text } from 'theme-ui'
import { useAnalytics, useUser } from '@chordcommerce/react-autonomy'
import FormInputWithLabel from '~/components/Generic/Form/InputWithLabel'
import { useTranslate } from '~/hooks'

const FooterNewsletterSignup = () => {
  const translate = useTranslate()
  const { trackEmailCaptured } = useAnalytics()
  const { user } = useUser()
  const { register, handleSubmit, errors } = useForm()
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = async data => {
    const { email } = data

    try {
      trackEmailCaptured({
        emailCapture: {
          email,
          page: 'all-pages',
          component: 'footer',
          website: window.location.host
        }
      })
      setSubmitted(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box
      sx={{
        paddingBottom: ['2rem', '2.75rem', '0'],
        borderBottom: ['1px solid', null, 'none'],
        textAlign: ['center', null, 'left'],
        width: ['100%', null, '50%']
      }}
    >
      <Box sx={{ width: ['100%', null, '70%'] }}>
        <Heading
          sx={{
            marginBottom: ['0.5rem'],
            variant: ['text.h3', null, 'text.h2']
          }}
        >
          {translate('footer.newsletter_signup.title')}
        </Heading>
        <Text
          sx={{
            marginBottom: ['16px', null, '24px'],
            marginRight: 'auto',
            marginLeft: 'auto',
            maxWidth: [null, '60%', 'none']
          }}
        >
          {translate('footer.newsletter_signup.text')}
        </Text>

        {!submitted && (
          <Flex
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              flexDirection: ['column', null, 'row'],
              flexWrap: 'wrap',
              margin: [null, 'auto'],
              width: [null, '295px', 'auto']
            }}
          >
            <Box
              sx={{
                position: 'relative',
                flexGrow: 1,
                marginRight: [null, null, '12px']
              }}
            >
              <FormInputWithLabel
                name="email"
                type="email"
                title={translate('footer.newsletter_signup.input_label')}
                label={translate('footer.newsletter_signup.input_label')}
                placeholder={translate('footer.newsletter_signup.input_label')}
                aria-label={translate('footer.newsletter_signup.input_label')}
                defaultValue={user.data.email}
                ref={register({
                  required: true,
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: translate('validation.invalid_email')
                  }
                })}
              />
            </Box>
            {errors && errors['email'] && (
              <Text
                variant="formError"
                sx={{
                  backgroundColor: 'errorLight',
                  padding: '12px 12px',
                  order: [null, null, 3],
                  marginBottom: ['0.75rem', null, '0']
                }}
              >
                {errors['email'].type === 'required' &&
                  translate('validation.required_field')}

                {errors['email'].type === 'pattern' &&
                  translate('validation.invalid_email')}
              </Text>
            )}
            <Button type="submit" sx={{ flexShrink: 0 }}>
              {translate('footer.newsletter_signup.button')}
            </Button>
          </Flex>
        )}

        {submitted && (
          <Box
            sx={{
              margin: [null, 'auto'],
              maxWidth: [null, '295px', 'none'],
              textAlign: ['center', null, 'left']
            }}
          >
            {translate('footer.newsletter_signup.confirmation')}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default FooterNewsletterSignup
