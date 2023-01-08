import React, { useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import VideoCard from "../components/VideoCard";
import { BASE_URL } from "../utils";
import { Video } from "../types";
import NoResults from "../components/NoResults";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: any) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      <Head>
        <title>Vidhub</title>
        <meta name="description" content="A web3 social media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {videos.length ? (
        videos?.map((video: any) => (
          <VideoCard post={video} isShowingOnHome key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};
