import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
	<>
		<main className='flex w-screen h-screen overflow-hidden'>
			<Sidebar/>
			<section className='w-[78vw] max-h-screen h-screen flex flex-col bg-gray-100'>{children}</section>
		</main>
	</>
  )
}

export default Layout