import React from 'react'
import Typography from '@material-ui/core/Typography'
import Layout from '../components/Layout'

const Index = (props) => {
  return (
		<Layout title='Home' headTitle='Home - App Name'>
			<Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
		</Layout>
  )
}

export default Index
