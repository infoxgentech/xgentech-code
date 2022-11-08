import React from 'react'
import { Grid } from 'theme-ui'
import ArticleCard from '~/components/Article/Card'

const ArticleList = ({ articles }) => (
  <Grid columns={[1, 2, 3]} gap={'3rem'}>
    {articles.map((article, index) => (
      <ArticleCard key={index} article={article} />
    ))}
  </Grid>
)

export default ArticleList
