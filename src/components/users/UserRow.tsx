import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import endpoints from '../../api/endpoints';
import patch from '../../api/handlers/patch';
import { toast } from 'sonner';
import Spinner from '../Spinner';

const UserRow = ({ user }: { user: UserType }) => {
	const { fetchUsers } = useUserContext();

	const [loading, setLoading] = useState(false)
	const handleBlock = async () => {
		setLoading(true)
		let apiResponse = await patch(`${endpoints.blockUser}/${user._id}`, {
			"blockStatus": user.block ? false : true
		})
		if (apiResponse.success && user._id) {
			toast.success(`User #${user._id.slice(18)} has been ${!user.block ? "blocked" : "unblocked"}`)
			fetchUsers();
		} else {
			toast.error("Something went wrong")
		}
		setLoading(false)
	}
	return (
		<tr className=" border-b even:bg-accent/5 odd:bg-white">
			<td className="px-6 py-4 font-semibold"><Link to={`/users/${user._id}`}>{`#${user._id.slice(18)}`}</Link></td>
			<td className="px-6 py-4">{user.name}</td>
			<td className="px-6 py-4">{user.username}</td>
			<td className="px-6 py-4">{user.email}</td>
			<td className="px-6 py-4"><span className={user.block ? 'px-3 py-2 text-xs text-red-700 bg-red-500/20 rounded-lg' : 'px-3 py-2 text-xs text-green-700 bg-green-500/20 rounded-lg'}>{!user.block ? "Active" : "Inactive"}</span></td>
			<td className="px-6 py-4"><span onClick={handleBlock} title={user.block ? "Unblock" : "Block"} className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center cursor-pointer">{loading ? <Spinner /> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={user.block ? "#a80d02" : "red"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ban"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>}</span></td>
		</tr>
	)
}

export default UserRow