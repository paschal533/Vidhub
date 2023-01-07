import { useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../components/Login";

const login = () => {
  const route = useRouter();
  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
  
    if (User) route.push('/');
  }, []);
  
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <Login />
    </div>
  )
}

export default login;