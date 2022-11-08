/** @jsxImportSource theme-ui */
import { Box, Container, Flex, Heading } from 'theme-ui'
import ResponsiveImage from '~/components/Generic/Image'

const ImageHeroWithGradient = ({ heading, image, subheading }) => {
  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
          height: '100%',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: '100%',
            py: ['2px'],
            minHeight: '108px',
            maxHeight: ['240px', '280px', '450px']
          }}
        >
          <ResponsiveImage image={image} quality={90} />
        </Box>
        <Flex
          sx={{
            width: ['100%', '70%', '65%'],
            textAlign: ['center', 'left', 'left'],
            flexDirection: 'column',
            justifyContent: 'center',
            padding: ['1rem', '1rem', '4rem'],
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            background: [
              'rgba(0,0,0,.3)',
              'linear-gradient(to right,rgba(0,0,0,.2), rgba(0,0,0,.2) 60%, rgba(0,0,0,0))',
              null
            ]
          }}
        >
          <Heading as="h1" variant="h1" sx={{ color: 'altBackground' }}>
            {heading}
          </Heading>
          {subheading && (
            <Heading
              as="h3"
              variant="subhead"
              sx={{ marginTop: '1rem', color: 'altBackground' }}
            >
              {subheading}
            </Heading>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

const ImageHeroWithoutGradient = ({ heading, image, subheading }) => {
  return (
    <Container variant="fullWidth">
      <Flex
        sx={{
          flexDirection: 'column',
          height: '100%',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            minHeight: '300px',
            maxHeight: '500px'
          }}
        >
          <ResponsiveImage image={image} quality={90} />
        </Box>
        <Flex
          sx={{
            textAlign: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: ['2rem 1rem', '5.5rem'],
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <Heading as="h1" variant="h1" sx={{ color: 'altBackground' }}>
            {heading}
          </Heading>
          {subheading && (
            <Heading
              as="h3"
              variant="subhead"
              sx={{ marginTop: '1rem', color: 'altBackground' }}
            >
              {subheading}
            </Heading>
          )}
        </Flex>
      </Flex>
    </Container>
  )
}

export const ImageHero = ({ gradient = false, ...props }) => {
  return gradient ? (
    <ImageHeroWithGradient {...props} />
  ) : (
    <ImageHeroWithoutGradient {...props} />
  )
}

export default ImageHero
