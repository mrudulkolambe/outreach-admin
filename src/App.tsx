import { useState } from 'react'
import './App.css'
import Input from './components/Input'
import Button from './components/Button';
import post from './api/handlers/post';
import endpoints from './api/endpoints';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/User/Users';
import Posts from './pages/Post/Posts';
import { AuthContextProvider } from './context/AuthContext';
import { PostContextProvider } from './context/PostContext';
import { UserContextProvider } from './context/UserContext';
import SingleUser from './pages/User/SingleUser';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        "username": email,
        "password": password
      }
      const response = await post(endpoints.login, body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <UserContextProvider>
            <PostContextProvider>
              <Routes>
                <Route path='/' Component={Login} />
                <Route path='/users/all' Component={Users} />
                <Route path='/users/:_id' Component={SingleUser} />
                <Route path='/posts/all' Component={Posts} />
              </Routes>
            </PostContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
