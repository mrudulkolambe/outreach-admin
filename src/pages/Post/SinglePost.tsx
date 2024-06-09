import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import 'swiper/css';
import Button from '../../components/Button';
import patch from '../../api/handlers/patch';
import endpoints from '../../api/endpoints';
import { usePostContext } from '../../context/PostContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const SinglePost = () => {
	const { getSinglePost, fetchPosts } = usePostContext();
	const { _id } = useParams()
	const [post, setPost] = useState<PostType | null>(null);
	const navigate = useNavigate()
	useEffect(() => {
		if (_id != null) {
			setPost(getSinglePost(_id))
		}
	}, [_id]);

	const handleBlock = async () => {
		let apiResponse = await patch(`${endpoints.blockPost}/${_id}`, {
			"blockStatus": post?.block ? false : true
		})
		if (apiResponse.success && _id) {
			fetchPosts();
			navigate(-1);
		} else {

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
				</div>
				<div className='flex p-6 flex-col'>
					<h2 className='text-3xl font-bold'>Post</h2>
					<div className='mt-5 w-full main flex-1 rounded-3xl overflow-hidden'>
						<div className='main w-full bg-white rounded-3xl shadow-xl overflow-scroll flex flex-col items-center p-10'>
							<div className='w-[70%] flex justify-between items-center'>
								<div className='flex gap-3 items-center'>
									<img src={post?.userId.imageUrl} className='h-12 w-12 rounded-full object-cover' alt="" />
									<div>
										<h2 className='font-bold'>{post?.userId.name}</h2>
										<p className='text-sm'>@{post?.userId.username}</p>
									</div>
								</div>
								<div>{post?.userId.block ? "Inactive" : "Active"}</div>
							</div>
							<div className='mt-2 rounded-xl overflow-hidden h-[50vh] w-[70%] flex justify-between items-center'>
								<Swiper
									className='h-full'
									spaceBetween={50}
									slidesPerView={1}
									onSlideChange={() => console.log('slide change')}
									onSwiper={(swiper) => console.log(swiper)}
								>
									{
										post?.media.map((post) => {
											return <SwiperSlide className='h-full'>
												{post.type == "jpg" || post.type == "png" || post.type == "jpeg" ? <img src={post.url} className='h-full w-full object-center object-cover' /> : <video  className='h-full w-full object-center object-cover' controls src={post.url} />}
											</SwiperSlide>
										})
									}

								</Swiper>
							</div>
							<p className='mt-4 text-left w-[70%]'>{post?.content}</p>
							<Button onClick={handleBlock} className="min-w-32 mt-5" text={post?.block ? 'Unblock' : 'Block'} disabled={false} type='button' loading={false} />

							{/* <div className='mt-5 flex flex-col items-center'>
								<h2 className='text-lg font-bold'>Posts</h2>
								<div className='w-[70%] bg-red-300 px-10'>
									<Swiper
										loop={true}
										className='bg-green-300 w-full'
										spaceBetween={100}
										slidesPerView={3}
										onSlideChange={() => console.log('slide change')}
										onSwiper={(swiper) => console.log(swiper)}
									>
										<SwiperSlide className='bg-purple-400 w-32'><img src={user?.imageUrl} className='h-32 w-32 bg-gray-300 object-cover' alt="" /></SwiperSlide>
										<SwiperSlide className='bg-purple-400 w-32'><img src={user?.imageUrl} className='h-32 w-32 bg-gray-300 object-cover' alt="" /></SwiperSlide>
										<SwiperSlide className='bg-purple-400 w-32'><img src={user?.imageUrl} className='h-32 w-32 bg-gray-300 object-cover' alt="" /></SwiperSlide>
										<SwiperSlide className='bg-purple-400 w-32'><img src={user?.imageUrl} className='h-32 w-32 bg-gray-300 object-cover' alt="" /></SwiperSlide>
									</Swiper>
								</div>
							</div> */}
						</div>
					</div>
				</div>
		</>
	)
}

export default SinglePost