import { ethers } from "ethers";
// @ts-ignore TODO: fix typescript error
import cc from "cryptocompare";

import { NFTMarketplaceAddress } from "../config";
import { NFTMarketplace__factory } from "../types/ethers-contracts";

export const fetchContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) => NFTMarketplace__factory.connect(NFTMarketplaceAddress, signerOrProvider);

export const getExchangeRate = async () => {
  const exchangeRate = await cc.price("MATIC", ["USD"]);
  return exchangeRate["USD"];
};
