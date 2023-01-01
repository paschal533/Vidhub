type Address = string;

export const NFTMarketplaceAddress = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as Address;
