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
			<div className="h-[80px] w-full flex items-center justify-center border-b-2">
				<img src="/assets/logo_1.svg" className="w-[40%]" alt="" />
			</div>
			<div className="w-full flex flex-col justify-between h-full py-5 sidebar-height">
				<div className="p-5 flex flex-col gap-5 h-full">
					{
						links.map((link) => {
							return link.show && <Link className={pathname.includes(link.url) ? "font-semibold text-accent" : "font-semibold"} to={link.url}>{link.label}</Link>
						})
					}
				</div>
				<span onClick={() => {
					localStorage.removeItem("token");
					window.location.href = "/"
				}} className="text-red-500 font-semibold cursor-pointer px-5 py-3 bg-white hover:bg-black/5 duration-100 w-full">Logout</span>
			</div>
		</nav>
	)
}

export default Sidebar