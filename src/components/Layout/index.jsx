import React from 'react'
import dynamic from 'next/dynamic'
import NotificationBar from '~/components/Notification/Bar'

const DynamicNav = dynamic(() => import('~/components/Nav'))
const DynamicFooter = dynamic(() => import('~/components/Footer'))

const Layout = ({ children }) => {
  return (
    <>
      <NotificationBar />
      <DynamicNav />
      <main>{children}</main>
      <DynamicFooter />
    </>
  )
}

export default Layout
