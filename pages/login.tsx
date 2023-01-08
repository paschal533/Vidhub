// @ts-nocheck
import { useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../components/Login";
import Head from "next/head";

const LoginPage = () => {
  const route = useRouter();
  useEffect(() => {
    // @ts-ignore TODO: fix typescript error
    const User =
      localStorage.getItem("user") !== "undefined"
        ? JSON.parse(localStorage.getItem("user"))
        : localStorage.clear();

    if (User) route.push("/");
  }, []);

  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <Head>
        <title>Vidhub || Login</title>
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
