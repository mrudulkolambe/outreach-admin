import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		setCollapse(localStorage.getItem("sidebar-collapse") == "true")
	}, []);
	const [collapse, setCollapse] = useState(false)
	return (
		<>
			<main className='flex w-screen h-screen overflow-hidden'>
				<Sidebar collapse={collapse} setCollapse={setCollapse} />
				<section className={collapse ? 'duration-200 transition-all w-[94vw] max-h-screen h-screen flex flex-col bg-gray-100' : 'duration-200 transition-all w-[78vw] max-h-screen h-screen flex flex-col bg-gray-100'}>{children}</section>
			</main>
		</>
	)
}

export default Layout