import { useEffect, useState } from 'react'
import PostRow from '../../components/posts/PostRow';
import { usePostContext } from '../../context/PostContext';

const Posts = () => {
	const { posts } = usePostContext()
	const [searchResults, setSearchResults] = useState<PostType[]>([]);
	useEffect(() => {
		setSearchResults(posts);
	}, [posts]);

	const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length < 3) {
			setSearchResults(posts);
		} else {
			let search = e.currentTarget.value.toLowerCase();
			let filteredPosts = posts.filter((post) => {
				console.log(post)
				return post._id.toLowerCase().includes(search) || post.userId._id.toLowerCase().includes(search) || post.userId.name?.toLowerCase().includes(search) || post.userId.email?.toLowerCase().includes(search) || post.userId.username?.toLowerCase().includes(search) || post.content?.toLowerCase().includes(search)
			})
			setSearchResults(filteredPosts);
		}
	}
	return (
		<>
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
					<input onChange={handleSearch} type="text" className='outline-none w-[20vw] bg-white px-3 py-3 rounded-xl' placeholder='Search...' />
				</div>
			</div>
			<div className='flex p-6 flex-col'>
				<h2 className='text-3xl font-bold'>Posts</h2>
				<div className='mt-5 w-full main flex-1 rounded-3xl overflow-hidden'>
					<div className='main w-full bg-white rounded-3xl shadow-xl overflow-scroll border-2'>
						<table className="w-full text-sm text-left rtl:text-right">
							<tr className='z-10 bg-white border-b-2 sticky top-0 shadow shadow-black/5'>
								<th className="px-6 py-4">#</th>
								<th className="px-6 py-4">User</th>
								<th className="px-6 py-4">Category</th>
								<th className="px-6 py-4">Content</th>
								<th className="px-6 py-4">Status</th>
								<th className="px-6 py-4">Action</th>
							</tr>
							{
								searchResults.map((post: PostType) => {
									return <PostRow post={post} key={post._id} />
								})
							}
						</table>
					</div>
				</div>
			</div>
		</>
	)
}

export default Posts