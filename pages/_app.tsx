import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { NFTMarketplaceProvider } from '../context/NFTMarketplaceContext';
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
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ apiKey: "fromD-TUkq4_7WynDvni4nAeITTkZEIj" }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Tiktok',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;

  const livepeerClient = createReactClient({
    provider: studioProvider({
      apiKey: "ec843d95-4ee3-4946-81af-fd85bb7702a4",
    }),
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <NFTMarketplaceProvider>
        <LivepeerConfig client={livepeerClient}>
         <KeyringProvider>
          <UploaderProvider>
            <AgentLoader>
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
          </AgentLoader>
          </UploaderProvider>
          </KeyringProvider>
        </LivepeerConfig>
        </NFTMarketplaceProvider>
      </RainbowKitProvider>
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
