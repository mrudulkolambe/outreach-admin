import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Users from './pages/User/Users';
import Posts from './pages/Post/Posts';
import { AuthContextProvider } from './context/AuthContext';
import { PostContextProvider } from './context/PostContext';
import { UserContextProvider } from './context/UserContext';
import SingleUser from './pages/User/SingleUser';
import SinglePost from './pages/Post/SinglePost';
import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  useEffect(() => {
    setCollapse(localStorage.getItem("sidebar-collapse") == "true")
  }, []);
  const [collapse, setCollapse] = useState(false)
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          <UserContextProvider>
            <PostContextProvider>
              <main className='flex w-screen h-screen overflow-hidden'>
                <Sidebar collapse={collapse} setCollapse={setCollapse} />
                <section className={collapse ? 'duration-200 transition-all w-[94vw] max-h-screen h-screen flex flex-col bg-gray-100' : 'duration-200 transition-all w-[78vw] max-h-screen h-screen flex flex-col bg-gray-100'}>
                  <Routes>
                    <Route path='/' Component={Login} />
                    <Route path='/users/all' Component={Users} />
                    <Route path='/users/:_id' Component={SingleUser} />
                    <Route path='/posts/all' Component={Posts} />
                    <Route path='/posts/:_id' Component={SinglePost} />
                  </Routes>
                </section>
              </main>
            </PostContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
