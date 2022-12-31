// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    using SafeERC20 for IERC20;

    IERC20 public immutable rewardsToken;

    uint256 listingPrice = 0.025 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address => uint256) private rewardTokenBalance;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      bool sold
    );

    event TransferSent(address _from, address _destAddr, uint _amount);

    constructor(address rewardTokenAddress) ERC721("Vidhub Tokens", "VID") {
      owner = payable(msg.sender);
      rewardsToken = IERC20(rewardTokenAddress);
    }

    /* Updates the listing price of the contract */
    function updateListingPrice(uint _listingPrice) public payable {
      require(owner == msg.sender, "Only marketplace owner can update listing price.");
      listingPrice = _listingPrice;
    }

    /* Returns the listing price of the contract */
    function getListingPrice() public view returns (uint256) {
      return listingPrice;
    }

    /* Returns the current tokenID of the contract */
    function getCurrentTokenID() public view returns (uint256) {
      return _tokenIds.current();
    }

    /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price) public payable {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price);
      transferERC20(rewardsToken, msg.sender, listingPrice);
      rewardTokenBalance[msg.sender] = rewardTokenBalance[msg.sender] + listingPrice;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price
    ) private {
      require(price > 0, "Price must be at least 1 wei");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        false
      );

      _transfer(msg.sender, address(this), tokenId);
      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        false
      );
    }

    /* allows someone to resell a token they have purchased */
    function resellToken(uint256 tokenId, uint256 price) public payable {
      require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
      idToMarketItem[tokenId].sold = false;
      idToMarketItem[tokenId].price = price;
      idToMarketItem[tokenId].seller = payable(msg.sender);
      idToMarketItem[tokenId].owner = payable(address(this));
      _itemsSold.decrement();

      _transfer(msg.sender, address(this), tokenId);
    }

    /* Creates the sale of a marketplace item */
    /* Transfers ownership of the item, as well as funds between parties */
    function createMarketSale(
      uint256 tokenId
      ) public payable {
      uint price = idToMarketItem[tokenId].price;
      require(msg.value == price, "Please submit the asking price in order to complete the purchase");
      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(address(this), msg.sender, tokenId);
      payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    function transferERC20(IERC20 token, address to, uint256 amount) public {
      uint256 erc20balance = token.balanceOf(address(this));
      require(amount <= erc20balance, "balance is low");
      token.transfer(to, amount);
      emit TransferSent(msg.sender, to, amount);
    }

    function getERC20Balsnce(address _address) public view returns (uint256) {
      uint256 erc20balance = rewardsToken.balanceOf(_address);
      return erc20balance;
    }

    function getOwner(uint tokenId) public view returns (address) {
      return idToMarketItem[tokenId].owner;
    }

    function getPrice(uint tokenId) public view returns (uint) {
      //return idToMarketItem[tokenId].price;
    }

    function getRewardTokenBalsnce(address _address) public view returns (uint256) {
      uint256 erc20balance = rewardTokenBalance[_address];
      return erc20balance;
    }     
}