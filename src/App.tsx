import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/User/Users';
import Posts from './pages/Post/Posts';
import { AuthContextProvider } from './context/AuthContext';
import { PostContextProvider } from './context/PostContext';
import { UserContextProvider } from './context/UserContext';
import SingleUser from './pages/User/SingleUser';

function App() {

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
