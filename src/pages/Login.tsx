import { useState } from 'react'
import Input from '../components/Input';
import Button from '../components/Button';
import post from '../api/handlers/post';
import endpoints from '../api/endpoints';
import { useNavigate } from 'react-router-dom';
import { usePostContext } from '../context/PostContext';
import { useUserContext } from '../context/UserContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { fetchUsers } = useUserContext();
  const { fetchPosts } = usePostContext();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const body = {
        "username": email,
        "password": password
      }
      const apiResponse = await post(endpoints.login, body);
      localStorage.setItem("token", apiResponse.response);
      if (apiResponse.success) {
        fetchUsers()
        fetchPosts()
        navigate("/users/all")
      } else {

      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <>
      <section className="flex items-center justify-center h-screen w-screen p-8 gap-8">
        <div className="w-1/2 h-full rounded-2xl flex flex-col justify-center items-center">
          <img src="/assets/logo_1.svg" className="w-56" alt="" />
          <form onSubmit={handleLogin} className="border mt-5 bg-white rounded-2xl p-8 w-[70%] shadow-xl">
            <h2 className="text-3xl font-extrabold text-center">Sign In</h2>
            <p className="text-center mt-2 font-medium">Welcome back! Please enter your details</p>
            <div className="flex flex-col gap-3">
              <Input label="Email" disabled={false} id={"email"} value={email} onChange={(e) => setEmail(e.currentTarget.value)} name={"email"} placeholder="test" type="text" />
              <Input label="Password" disabled={false} id={"password"} value={password} onChange={(e) => setPassword(e.currentTarget.value)} name={"password"} placeholder="test" type="text" />
              <Button text="Login" disabled={false} loading={loading} type="submit" />
            </div>
          </form>
        </div>
        <div className="w-1/2 h-full bg-accent rounded-2xl"></div>
      </section>
    </>
  )
}

export default Login
