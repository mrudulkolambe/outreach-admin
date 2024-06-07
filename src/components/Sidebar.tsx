import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
	const { pathname } = useLocation()
	const links = [
		{
			url: "/dashboard",
			label: "Dashboard",
			show: false
		},
		{
			url: "/users/all",
			label: "Users",
			show: true
		},
		{
			url: "/posts/all",
			label: "Posts",
			show: true
		},
	]
	return (
		<nav className='flex flex-col w-[22vw] border-r-2 h-screen'>
			<div className="h-[80px] w-full bg-green-50"></div>
			<div className="p-5 flex flex-col gap-5">
				{
					links.map((link) => {
						return link.show && <Link className={pathname.includes(link.url) ? "font-semibold text-accent" : "font-semibold"} to={link.url}>{link.label}</Link>
					})
				}
			</div>
		</nav>
	)
}

export default Sidebar