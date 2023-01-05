import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, Chain } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { NFTMarketplaceProvider } from '../context/NFTMarketplaceContext';
import { ChakraProvider } from '@chakra-ui/react'
import '@rainbow-me/rainbowkit/styles.css';
import { KeyringProvider, useKeyring } from '@w3ui/react-keyring'
import { UploaderProvider } from '@w3ui/react-uploader'
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import '../styles/globals.css';


const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  const alchemyId = "fromD-TUkq4_7WynDvni4nAeITTkZEIj";


  const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ apiKey: "fromD-TUkq4_7WynDvni4nAeITTkZEIj" }),
      publicProvider()
    ]
  );

  const client = createClient(
    getDefaultClient({
      appName: "FundBrave",
      alchemyId,
      chains,
    })
  );
  

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;

  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
    }),
  });

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <NFTMarketplaceProvider>
        <LivepeerConfig client={livepeerClient}>
         <KeyringProvider>
          <UploaderProvider>
            <AgentLoader>
            <ChakraProvider>
          <div className='xl:w-[1200px] m-auto overflow-hidden h-[100vh]'>
            <Navbar />
            <div className='flex gap-6 md:gap-20 '>
              <div className='h-[92vh] overflow-hidden xl:overflow-auto'>
                <Sidebar />
              </div>
              <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
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
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

function AgentLoader ({ children  } : any) {
  const [, { loadAgent }] = useKeyring()
  // eslint-disable-next-line
  useEffect(() => { loadAgent() }, []) // load agent - once.
  return children
}

export default MyApp;
