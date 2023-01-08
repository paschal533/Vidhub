import React, { useEffect, useRef, useState, useContext } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { Player, useAssetMetrics } from "@livepeer/react";
import Comments from "../../components/Comments";
import { BASE_URL } from "../../utils";
import LikeButton from "../../components/LikeButton";
import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import axios from "axios";
import styled from "styled-components";
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

interface IProps {
  postDetails: Video;
}

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 4px 10px;
  color: #ffffff;
  background: #f51997;
  border-radius: 1rem;
  box-shadow: 0 4px 24px -6px #1a88f8;
`;

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const { buyNft, currentAccount } = useContext(NFTMarketplaceContext);

  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  const { userProfile }: any = useAuthStore();

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const buyNFT = async () => {
    setIsBuying(true);
    await buyNft(postDetails);
    await updatePost();
    setIsBuying(false);
  };

  const updatePost = async () => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/update/${post._id}`, {
        userId: userProfile._id,
        owner: currentAccount,
      });

      setPost({
        ...post,
        owner: res.data.owner,
        userId: res.data.userId,
        postedBy: res.data.postedBy,
      });
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      setPost({ ...post, likes: res.data.likes });
    }
  };

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile) {
      if (comment) {
        setIsPostingComment(true);
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        setPost({ ...post, comments: res.data.comments });
        setComment("");
        setIsPostingComment(false);
      }
    }
  };

  return (
    <>
      {post && (
        <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
          <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
            <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
              <p className="cursor-pointer " onClick={() => router.back()}>
                <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
              </p>
            </div>
            <div className="relative">
              <div className="lg:h-[100vh] cursor-pointer h-full  rounded-3xl lg:w-[600px] md:h-[400px] w-[200px]  p-4 flex flex-col gap-6 justify-center items-center">
                <Player title={post.caption} playbackId={post.videoLink} />
              </div>
            </div>
          </div>
          <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
            <div className="lg:mt-20 mt-10">
              <Link href={`/profile/${post.postedBy._id}`}>
                <div className="flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer">
                  <Image
                    width={60}
                    height={60}
                    alt="user-profile"
                    className="rounded-full"
                    src={post.postedBy.image}
                  />
                  <div>
                    <div className="text-xl font-bold lowercase tracking-wider flex gap-2 items-center justify-center">
                      {post.postedBy.userName.replace(/\s+/g, "")}{" "}
                      <GoVerified className="text-blue-400 text-xl" />
                    </div>
                    <p className="text-md"> {post.postedBy.userName}</p>
                  </div>
                </div>
              </Link>
              <div className="px-10">
                <p className=" text-md text-gray-600">{post.caption}</p>
              </div>
              <div className="mt-10 flex items-center space-x-3 px-10">
                {userProfile && (
                  <LikeButton
                    likes={post.likes}
                    flex="flex"
                    handleLike={() => handleLike(true)}
                    handleDislike={() => handleLike(false)}
                  />
                )}

                {userProfile && (
                  <StyledButton onClick={buyNFT} className="text-md ">
                    {isBuying
                      ? "Buying..."
                      : `Purchase for ${postDetails.price} matic`}
                  </StyledButton>
                )}
              </div>
              <Comments
                comment={comment}
                setComment={setComment}
                addComment={addComment}
                comments={post.comments}
                isPostingComment={isPostingComment}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/post/${id}`);

  return {
    props: { postDetails: res.data },
  };
};

export default Detail;
