const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

async function main() {
  console.log(`Preparing deployment...\n`);

  let accounts = await ethers.getSigners();
  let deployer = accounts[0];

  // Fetch contract to deploy
  const Token = await ethers.getContractFactory("Token");
  const nFTMarketplace = await ethers.getContractFactory("NFTMarketplace");

  // Deploy contracts
  const vidToken = await Token.deploy("Vidhub", "VID", "1000000000000");
  await vidToken.deployed();

  // Deploy contracts
  const NFTMarketplace = await nFTMarketplace.deploy(vidToken.address);
  await NFTMarketplace.deployed();

  let transaction = await vidToken
    .connect(deployer)
    .transfer(NFTMarketplace.address, tokens(10000));
  await transaction.wait();

  console.log(`NFTMarketplace Deployed to: ${NFTMarketplace.address}`);
  console.log(`vidToken Deployed to: ${vidToken.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
