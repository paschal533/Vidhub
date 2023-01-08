import React, { useEffect, useState, useContext } from "react";
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import styled from "styled-components";
import useAuthStore from "../store/authStore";
import { IUser } from "../types";
import Logo from "../utils/logo.png";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #ffffff;
  background: #f51997;
  width: 180px;
  font-size: 17px;
  font-weight: 500;
  border-radius: 1rem;
  box-shadow: 0 4px 24px -6px #1a88f8;
  @media (max-width: 600px) {
    width: 180px;
  }
  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #1a88f8;
  }
  &:disabled,
  button[disabled] {
    border: 1px solid #999999;
    color: #ffffff;
    background: #83bffb !important;
    cursor: no-drop;
  }
`;

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const { userProfile } = useAuthStore();
  const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] mb-3 md:w-[129px] md:h-[30px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {currentAccount ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user?.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <StyledButton onClick={connectWallet}>
              {/*@ts-ignore TODO: fix typescript error*/}
              {`${currentAccount?.slice(0, 4)}...${currentAccount?.slice(-4)}`}
            </StyledButton>
          </div>
        ) : (
          <StyledButton onClick={connectWallet}>Connect wallet</StyledButton>
        )}
      </div>
    </div>
  );
};

export default Navbar;
