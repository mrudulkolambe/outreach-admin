import { Link } from "react-router-dom"
import patch from "../../api/handlers/patch";
import endpoints from "../../api/endpoints";
import { usePostContext } from "../../context/PostContext";
import { useState } from "react";
import Spinner from "../Spinner";
import { toast } from "sonner";

const PostRow = ({ post }: { post: PostType }) => {
	const { fetchPosts } = usePostContext();
	const [loading, setLoading] = useState(false)
	const handleBlock = async () => {
		setLoading(true)
		let apiResponse = await patch(`${endpoints.blockPost}/${post._id}`, {
			"blockStatus": post.block ? false : true
		})
		if (apiResponse.success && post._id) {
			toast.success(`Post #${post._id.slice(18)} has been ${!post.block ? "blocked" : "unblocked"}`)
			fetchPosts();
		} else {
			toast.error("Something went wrong")
		}
		setLoading(false)
	}
	return (
		<tr className=" border-b even:bg-accent/5 odd:bg-white">
			<td className="relative cursor-pointer px-6 py-4 font-semibold">
				<Link to={`/posts/${post._id}`}>{`#${post._id.slice(18)}`}</Link>
			</td>
			<td className="px-6 py-4">
				<div className='flex gap-2'>
					<img className='h-10 w-10 rounded-full object-cover' src={post.userId.imageUrl} alt="" />
					<span className='flex flex-col'>
						<h4 className='font-semibold'>{post.userId.name}</h4>
						<p className='text-xs text-gray-500'>@{post.userId.username}</p>
					</span>
				</div>
			</td>
			<td className="px-6 py-4">{post.public ? "Public" : "Private"}</td>
			<td className="px-6 py-4">{post.content.slice(0, 10)}...</td>
			<td className="px-6 py-4"><span className={post.block ? 'w-[210px] px-3 py-2 text-xs text-red-700 bg-red-500/20 rounded-lg' : 'w-[210px] px-3 py-2 text-xs text-green-700 bg-green-500/20 rounded-lg'}>{!post.block ? "Active" : "Inactive"}</span></td>
			<td className="px-6 py-4"><span onClick={handleBlock} title={post.block ? "Unblock" : "Block"} className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center cursor-pointer">{loading ? <Spinner /> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={post.block ? "#a80d02" : "red"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ban"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>}</span></td>
		</tr>
	)
}

export default PostRow