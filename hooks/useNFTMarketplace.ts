import Web3Modal from "web3modal";
import { useEffect, useState, useContext } from "react";
import { ethers, providers } from "ethers";
import * as API from "../services/api";

export const useNFTMarketplace = () => {
  const [isloadingNFT, setIsLoadingNFT] = useState(false);

  const createSale = async (url : string, formInputPrice : any, isReselling : boolean, id : any) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = API.fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = !isReselling
      ? await contract.createToken(url, price, { value: listingPrice.toString() })
      : await contract.resellToken(id, price, { value: listingPrice.toString() });

    setIsLoadingNFT(true);
    await transaction.wait();
  };

  
  const getCurrentID = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = API.fetchContract(signer);

    const id = await contract.getCurrentTokenID();

    return id.toString();

  };

  const buyNft = async (nft : any) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = API.fetchContract(signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nft.tokenId, { value: price });
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
  };

  return { isloadingNFT, createSale, buyNft, getCurrentID }
}