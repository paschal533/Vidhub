import React from "react";
import { useNFTMarketplace } from "../hooks/useNFTMarketplace";

type Context = ReturnType<typeof useNFTMarketplace>;

export const NFTMarketplaceContext = React.createContext<Context>(
  {} as Context
);

interface Props {
  children: React.ReactNode;
}

export const NFTMarketplaceProvider = ({ children }: Props) => {
  const value = useNFTMarketplace();

  return (
    <NFTMarketplaceContext.Provider value={value}>
      {children}
    </NFTMarketplaceContext.Provider>
  );
};
