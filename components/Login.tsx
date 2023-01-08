import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { createOrGetUser } from "../utils";
import Logo from "../utils/logo.png";
import { GoogleLogin } from "@react-oauth/google";
import { useKeyring } from "@w3ui/react-keyring";
import useAuthStore from "../store/authStore";

const Login = ({ children }: any) => {
  const route = useRouter();
  const { addUser } = useAuthStore();
  const [{ space }, { createSpace, registerSpace, cancelRegisterSpace }] =
    useKeyring();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  if (space?.registered()) {
    return children;
  }

  const responseGoogle = async (response: any) => {
    const { _id, userName, image, email } = await createOrGetUser(
      response,
      addUser
    );
    setEmail(email);

    const doc = {
      _id: _id,
      _type: "user",
      userName: userName,
      image: image,
    };

    localStorage.setItem("user", JSON.stringify(doc));

    try {
      await createSpace();
      await registerSpace(email);
    } catch (err) {
      console.log("failed to register", { cause: err });
    } finally {
      setSubmitted(false);
    }
    route.push("/");
  };

  return (
    <div className="flex justify-start items-center w-full flex-col h-screen">
      {!submitted ? (
        <div className="flex justify-start items-center w-full flex-col h-screen">
          <div className=" relative w-full h-full">
            <video
              src="./share.mp4"
              loop
              controls={false}
              muted
              autoPlay
              className="w-full h-full object-cover"
            />

            <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0">
              <div className="w-[100px] mb-6 md:w-[129px] md:h-[30px] h-[38px]">
                <Image
                  className="cursor-pointer"
                  src={Logo}
                  alt="logo"
                  layout="responsive"
                />
              </div>

              <div className="shadow-2xl">
                <GoogleLogin onSuccess={responseGoogle} onError={() => {}} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">
          <h1 className="-white">Verify your email address!</h1>
          <p>Click the link in the email we sent to {email} to sign in.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              cancelRegisterSpace();
            }}
          >
            <button type="submit" className="ph3 pv2">
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
