import { Image, UserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom"
import { twMerge } from "tailwind-merge";

interface SidebarProps {
	collapse: boolean;
	setCollapse: React.Dispatch<React.SetStateAction<boolean>>;
}


const Sidebar = ({ collapse, setCollapse }: SidebarProps) => {
	const { pathname } = useLocation()
	const links = [
		{
			url: "/dashboard",
			label: "Dashboard",
			icon: "",
			show: false
		},
		{
			url: "/users/all",
			label: "Users",
			icon: <UserRound className="text-3xl" />,
			show: true
		},
		{
			url: "/posts/all",
			label: "Posts",
			icon: <Image />,
			show: true
		},
	]
	return (
		<nav className={collapse ? 'duration-200 transition-all flex flex-col w-[6vw] border-r-2 h-screen' : 'duration-200 transition-all flex flex-col w-[22vw] border-r-2 h-screen'}>
			<div className="h-[80px] w-full flex items-center justify-center border-b-2">
				{collapse ? <img src="/assets/logo.svg" className={"w-[80%]"} alt="" /> :
				<img src="/assets/logo_1.svg" className={"w-[40%]"} alt="" />}
			</div>
			<div className="w-full flex flex-col justify-between h-full py-5 sidebar-height items-center">
				<div className="p-5 flex flex-col gap-2 h-full w-full">
					{
						links.map((link) => {
							return link.show && <Link className={twMerge("rounded-lg gap-3 w-full font-semibold flex items-center", pathname.includes(link.url) ? "bg-accent/20 text-accent" : "hover:bg-accent/5 text-gray-400", !collapse ? "px-5 py-3" : "py-3 justify-center") } to={link.url}>{link.icon} {!collapse && link.label}</Link>
						})
					}
			</div>
			<span onClick={() => {
				localStorage.removeItem("token");
				window.location.href = "/"
			}} className="text-red-500 font-semibold cursor-pointer px-5 py-3 bg-white hover:bg-black/5 duration-100 w-full">Logout</span>
			<span onClick={() => {
				setCollapse(!collapse)
				localStorage.setItem("sidebar-collapse", String(!collapse))
			}
			} className="cursor-pointer h-12 w-12 bg-accent/40 rounded-lg flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
			</span>
		</div>
		</nav >
	)
}

export default Sidebar