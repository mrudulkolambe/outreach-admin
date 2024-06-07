import { createContext, useContext, useEffect, useState } from 'react';
import get from '../api/handlers/get';
import endpoints from '../api/endpoints';
import { useAuthContext } from './AuthContext';


interface UserContextType {
	users: UserType[];
	setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
	fetchUsers: () => Promise<void>;
	getSingleUser: (_id: string) => UserType | null;
}

const defaultUserContext: UserContextType = {
	users: [],
	setUsers: () => { },
	fetchUsers: async () => { },
	getSingleUser: (_id: string) => null
};

const UserContext = createContext(defaultUserContext);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<UserType[]>([]);
	const { token } = useAuthContext();

	const fetchUsers = async () => {
		const apiRes = await get(endpoints.getUsers)
		setUsers(apiRes.response);
	}

	const getSingleUser = (_id: string): UserType | null => {
		let user = users.filter((user) => {
			return user._id == _id
		})

		if (user.length != 0) {
			return user[0]
		} else {
			return null
		}
	}

	useEffect(() => {
		if (token) {
			fetchUsers()
		}
	}, [token]);
	
	return (
		<UserContext.Provider value={{ users, setUsers, fetchUsers, getSingleUser }}>
			{children}
		</UserContext.Provider>
	);
}

const useUserContext = () => {
	return useContext(UserContext);
}

export { UserContextProvider, useUserContext };