import React from 'react'
import { Helmet } from 'react-helmet'
const Meta = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? title : 'welcome to proShop'}</title>
      <meta name='description' content='we sell the best products for cheap' />
      <meta
        name='keyword'
        content='electronics, cheap electronics,buy , gaming'
      />
    </Helmet>
  )
}

export default Meta
