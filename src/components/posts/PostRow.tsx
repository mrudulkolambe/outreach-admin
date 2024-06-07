import React, { useState } from 'react'

const PostRow = ({ post }: { post: PostType }) => {
	return (
		<tr className=" border-b even:bg-accent/5 odd:bg-white">
			<td className="relative cursor-pointer px-6 py-4 font-semibold">
				{`#${post._id.slice(18)}`}
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
			<td className="px-6 py-4"><span className={post.block ? 'px-3 py-2 text-xs text-green-700 bg-green-500/20 rounded-lg' : 'px-3 py-2 text-xs text-green-700 bg-green-500/20 rounded-lg'}>{!post.block ? "Active" : "Inactive"}</span></td>
		</tr>
	)
}

export default PostRow