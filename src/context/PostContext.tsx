import { createContext, useContext, useEffect, useState } from 'react';
import get from '../api/handlers/get';
import endpoints from '../api/endpoints';
import { useAuthContext } from './AuthContext';


interface PostContextType {
	posts: PostType[];
	setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
	fetchPosts: () => Promise<void>;
}

const defaultPostContext: PostContextType = {
	posts: [],
	setPosts: () => { },
	fetchPosts: async () => { }
};

const PostContext = createContext(defaultPostContext);

const PostContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [posts, setPosts] = useState<PostType[]>([]);
	const { token } = useAuthContext()

	const fetchPosts = async () => {
		const apiRes = await get(endpoints.getPosts)
		console.log("posts fetching");
		setPosts(apiRes.response);
	}

	useEffect(() => {
		if (token) {
			fetchPosts()
		}
	}, [token]);


	return (
		<PostContext.Provider value={{ posts, setPosts, fetchPosts }}>
			{children}
		</PostContext.Provider>
	);
}

const usePostContext = () => {
	return useContext(PostContext);
}

export { PostContextProvider, usePostContext };