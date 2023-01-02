import { ethers, providers } from "ethers";
// @ts-ignore TODO: fix typescript error
import cc from "cryptocompare";

import { NFTMarketplaceAddress } from "../config";
import {
  NFTMarketplace__factory
} from "../types/ethers-contracts";

export const fetchContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider
) =>
  NFTMarketplace__factory.connect(
    "0x7ec205F8573E16678fE130A132a0956eEc79E9B2",
    signerOrProvider
);

export const getExchangeRate = async () => {
  const exchangeRate = await cc.price("MATIC", ["USD"]);
  return exchangeRate["USD"];
};