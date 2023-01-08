import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineComment } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import { BsPlay } from "react-icons/bs";
import { Player, useAssetMetrics } from "@livepeer/react";
import { Video } from "./../types";
import LikeButton from "../components/LikeButton";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { BASE_URL } from "../utils";
import Share from "./Share";
import { useDisclosure } from "@chakra-ui/react";

interface IProps {
  post: Video;
  isShowingOnHome?: boolean;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, videoLink, _id, likes },
  isShowingOnHome,
}) => {
  const [playing, setPlaying] = useState(false);
  const [like, setLike] = useState<any>(likes);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { userProfile }: any = useAuthStore();

  useEffect(() => {}, [userProfile]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: _id,
        like,
      });
      setLike(res.data.likes);
    }
  };

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if (!isShowingOnHome) {
    return (
      <div>
        <Link href={`/detail/${_id}`}>
          <div className=" rounded-3xl w-[260px] h-[458px]  p-4 flex flex-col gap-6 justify-center items-center">
            <Player title={caption} playbackId={videoLink} />
          </div>
        </Link>
        <div className="flex gap-2 -mt-8 items-center ml-4">
          <p className="text-white text-lg font-medium flex gap-1 items-center">
            <BsPlay className="text-2xl" />
            {likes?.length || 0}
          </p>
        </div>
        <Link href={`/detail/${_id}`}>
          <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">
            {caption}
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${postedBy?._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className=" rounded-full"
                  src={postedBy?.image}
                  alt="user-profile"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${postedBy?._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
                <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                  {postedBy.userName}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className="mt-2 font-normal ">{caption}</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="rounded-3xl"
        >
          <div className=" rounded-3xl lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px]  p-4 flex flex-col gap-6 justify-center items-center">
            <Player title={caption} playbackId={videoLink} />
          </div>

          <div className="w-full flex justify-between items-center">
            <div className="flex space-x-3 items-center">
              {userProfile && (
                <LikeButton
                  likes={like}
                  flex="flex"
                  handleLike={() => handleLike(true)}
                  handleDislike={() => handleLike(false)}
                />
              )}

              <Link href={`/detail/${_id}`}>
                <div className="font-[50px] cursor-pointer text-3xl">
                  <AiOutlineComment />
                </div>
              </Link>
            </div>

            <div
              onClick={onOpen}
              className="font-[50px] cursor-pointer text-3xl"
            >
              <FiShare2 />
            </div>
          </div>
          <Share
            isOpen={isOpen}
            name={caption}
            image={videoLink}
            onClose={onClose}
            url={`http://localhost:3000/detail/${_id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
