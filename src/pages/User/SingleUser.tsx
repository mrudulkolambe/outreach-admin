import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useUserContext } from '../../context/UserContext';
import { useNavigate, useParams  } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import Button from '../../components/Button';
import patch from '../../api/handlers/patch';
import endpoints from '../../api/endpoints';


const SingleUser = () => {
	const { getSingleUser } = useUserContext();
	const { _id } = useParams()
	const [user, setUser] = useState<UserType | null>(null);
	const { fetchUsers } = useUserContext()
	const navigate = useNavigate()
	useEffect(() => {
		if (_id != null) {
			setUser(getSingleUser(_id))
		}
	}, [_id]);

	const handleBlock = async () => {
		let apiResponse = await patch(`${endpoints.blockUser}/${_id}`, {
			"blockStatus": user?.block ? false : true
		})

		if (apiResponse.success && _id) {
			fetchUsers();
			navigate(-1);
		} else {

		}
	}
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
				</div>
				<div className='flex p-6 flex-col'>
					<h2 className='text-3xl font-bold'>Profile</h2>
					<div className='mt-5 w-full main flex-1 rounded-3xl overflow-hidden'>
						<div className='main w-full bg-white rounded-3xl shadow-xl overflow-scroll flex flex-col items-center p-10'>
							<img src={user?.imageUrl} className='h-32 w-32 bg-gray-300 rounded-full object-cover' alt="" />
							<div className='mt-3'>
								<h1 className='text-2xl font-bold'>{user?.name}</h1>
								<h3 className='text-center'>@{user?.username}</h3>
							</div>

							<div className='py-3 mt-4 border-2 rounded-lg w-max text-center text-sm grid grid-cols-3'>
								<div className='border-r-2 px-4'>
									<span className='font-medium text-gray-500'><b className='text-black'>259</b> Posts</span>
								</div>
								<div className=' px-4'>
									<span className='font-medium text-gray-500'><b className='text-black'>25k</b> Followers</span>
								</div>
								<div className='border-l-2 px-4'>
									<span className='font-medium text-gray-500'><b className='text-black'>3k</b> Following</span>
								</div>
							</div>

							<div className='mt-5 flex flex-col items-center'>
								<h2 className='text-lg font-bold'>Bio</h2>
								<p className='mt-3 max-w-[70%] text-center font-medium text-sm text-gray-500'>{user?.bio}</p>
							</div>

							<Button onClick={handleBlock} className="min-w-32 mt-5" text={user?.block ? 'Unblock' : 'Block'} disabled={false} type='button' loading={false} />

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
			</Layout>
		</>
	)
}

export default SingleUser