import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import QuotesTable from './QuotesTable'

import '../../styles.global.css'

const AdminFortuneCookieQuote: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="fortune-cookie-app.title" />}
        />
      }
    >
      <PageBlock variation="full">
        <QuotesTable />
      </PageBlock>
    </Layout>
  )
}

export default AdminFortuneCookieQuote
