import Web3Modal from "web3modal";
import { useEffect, useState, useContext } from "react";
import { ethers, providers } from "ethers";
import * as API from "../services/api";
import { useToast } from '@chakra-ui/react'

export const useNFTMarketplace = () => {
  const [isloadingNFT, setIsLoadingNFT] = useState(false);
  const toast = useToast()

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

  const getUserEarning = async (addrs : any) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = API.fetchContract(signer);

    const tokenBalance = await contract.getRewardTokenBalsnce(addrs);

    return tokenBalance.toString();

  };

  const buyNft = async (nft : any) => {
    try{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = API.fetchContract(signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether');
    const transaction = await contract.createMarketSale(nft.tokenID, { value: price });
    setIsLoadingNFT(true);
    await transaction.wait();
    setIsLoadingNFT(false);
    }catch(error){
      toast({
        title: 'Not enough funds',
        position: 'top-left',
        description: "Sorry, you do not have enough funds to purchase this NFT",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
      console.log(error)
    }
  };

  return { isloadingNFT, createSale, buyNft, getCurrentID, getUserEarning }
}