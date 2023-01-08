import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext";
import { ChakraProvider } from "@chakra-ui/react";
import { KeyringProvider, useKeyring } from "@w3ui/react-keyring";
import { UploaderProvider } from "@w3ui/react-uploader";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";
import "../styles/globals.css";
import useAuthStore from "../store/authStore";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const { userProfile } = useAuthStore();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const route = useRouter();
  useEffect(() => {
    if (userProfile == null) {
      route.push("/login");
    }
  }, []);

  if (isSSR) return null;

  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    }),
  });

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <NFTMarketplaceProvider>
        <LivepeerConfig client={livepeerClient}>
          <KeyringProvider>
            <UploaderProvider>
              <AgentLoader>
                <ChakraProvider>
                  <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
                    <Navbar />
                    <div className="flex gap-6 md:gap-20 ">
                      <div className="h-[92vh] overflow-hidden xl:overflow-auto">
                        <Sidebar />
                      </div>
                      <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
                        <Component {...pageProps} />
                      </div>
                    </div>
                  </div>
                </ChakraProvider>
              </AgentLoader>
            </UploaderProvider>
          </KeyringProvider>
        </LivepeerConfig>
      </NFTMarketplaceProvider>
    </GoogleOAuthProvider>
  );
};

function AgentLoader({ children }: any) {
  const [, { loadAgent }] = useKeyring();
  // eslint-disable-next-line
  useEffect(() => {
    loadAgent();
  }, []); // load agent - once.
  return children;
}

export default MyApp;
