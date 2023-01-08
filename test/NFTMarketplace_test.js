const { expect } = require("chai");
const { ethers } = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), "ether");
};

describe("NFTMarketplace test", () => {
  let nFTMarketPlace, deployer, receiver, token1;

  beforeEach(async () => {
    const NFTMarketPlace = await ethers.getContractFactory("NFTMarketplace");
    const Token = await ethers.getContractFactory("Token");

    token1 = await Token.deploy("Vidhub", "VID", "1000000");
    nFTMarketPlace = await NFTMarketPlace.deploy(token1.address);
    accounts = await ethers.getSigners();
    deployer = accounts[0];
    receiver = accounts[1];

    let transaction = await token1
      .connect(deployer)
      .transfer(nFTMarketPlace.address, tokens(100));
    await transaction.wait();
  });

  it("updates listing price", async () => {
    await nFTMarketPlace.updateListingPrice(tokens(3));
    const listingPrice = await nFTMarketPlace.getListingPrice();
    expect(tokens(3)).to.equal(listingPrice.toString());
  });

  it("creates market token", async () => {
    await nFTMarketPlace.createToken("https:nftkastle.com", "20");

    const currentTokenID = await nFTMarketPlace.getCurrentTokenID();
    expect("1").to.equal(currentTokenID.toString());
  });

  describe("Selling and Buying Token", () => {
    it("creates Market Sale", async () => {
      await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
        value: tokens(0.025),
      });
      let price = await nFTMarketPlace.getPrice(1);
      let transaction = await nFTMarketPlace
        .connect(receiver)
        .createMarketSale(1, { value: price.toString() });
      let result = transaction.wait();

      let owner = await nFTMarketPlace.getOwner(1);

      expect(owner).to.equal(receiver.address);
    });

    it("Resells token", async () => {
      await nFTMarketPlace.createToken("https:nftkastle.com", "20", {
        value: tokens(0.025),
      });
      let price = await nFTMarketPlace.getPrice(1);
      let transaction = await nFTMarketPlace
        .connect(receiver)
        .createMarketSale(1, { value: price.toString() });
      let result = transaction.wait();

      await nFTMarketPlace
        .connect(receiver)
        .resellToken(1, tokens(30), { value: tokens(0.025) });

      let UpdatedPrice = await nFTMarketPlace.getPrice(1);
      expect(UpdatedPrice.toString()).to.equal(tokens(30));
    });
  });
});
