import React from 'react'
import { Grid } from 'theme-ui'
import KitCard from '~/components/Kit/Card'

const KitList = ({ kits }) => (
  <Grid
    columns={[1, 2, 3]}
    gap={['0.75rem', '2.25rem']}
    p={['0 0.5rem 2rem 0.5rem', '0 0 6.25rem 0']}
  >
    {kits.map(kit => (
      <KitCard key={kit.slug} kit={kit} />
    ))}
  </Grid>
)

export default KitList
