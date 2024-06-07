import { useState } from 'react'
import Layout from '../../components/Layout'
import { useUserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const Users = () => {
	const [search, setSearch] = useState("");
	const { users } = useUserContext()
	return (
		<>
			<Layout>
				<div className="h-[80px] w-full border-b flex justify-between items-center px-6">
					<div className='flex gap-3'>
						<img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg" className='bg-gray-400 h-10 w-10 rounded-full object-cover' alt="" />
						<div className='mr-3 flex flex-col'>
							<h3 className='font-semibold'>Outreach Admin</h3>
							<p className='text-[10px] font-semibold text-gray-400'>Administrator</p>
						</div>
					</div>
					<div className='relative w-[22vw] items-center bg-white shadow-md shadow-black/5 rounded-2xl flex justify-end'>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="lightgrey" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
						<input value={search} type="text" onChange={(e) => setSearch(e.currentTarget.value)} className='outline-none w-[20vw] bg-white px-3 py-3 rounded-xl' placeholder='Search...' />
					</div>
				</div>
				<div className='flex p-6 flex-col'>
					<h2 className='text-3xl font-bold'>Users</h2>
					<div className='mt-5 w-full main flex-1 rounded-3xl overflow-hidden'>
						<div className='main w-full bg-white rounded-3xl shadow-xl overflow-scroll'>
							<table className="w-full text-sm text-left rtl:text-right">
								<tr className='bg-white border-b-2 sticky top-0 shadow shadow-black/5'>
									<th className="px-6 py-4">#</th>
									<th className="px-6 py-4">Name</th>
									<th className="px-6 py-4">Username</th>
									<th className="px-6 py-4">Email</th>
									<th className="px-6 py-4">Status</th>
								</tr>
								{
									users.map((user: UserType) => {
										return <tr className=" border-b even:bg-accent/5 odd:bg-white">
											<td className="px-6 py-4 font-semibold"><Link to={`/users/${user._id}`}>{`#${user._id.slice(18)}`}</Link></td>
											<td className="px-6 py-4">{user.name}</td>
											<td className="px-6 py-4">{user.username}</td>
											<td className="px-6 py-4">{user.email}</td>
											<td className="px-6 py-4"><span className={user.block ? 'px-3 py-2 text-xs text-red-700 bg-red-500/20 rounded-lg' : 'px-3 py-2 text-xs text-green-700 bg-green-500/20 rounded-lg'}>{!user.block ? "Active" : "Inactive"}</span></td>
										</tr>
									})
								}
							</table>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}

export default Users