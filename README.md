# Vidhub

Vidhub is a decentralized social media, video-sharing app that allows users to create, watch, and share 40-second videos shot on mobile devices or webcams. The video posted will be minted as NFT and can be bought by another user. Users are also rewarded with 0.025 of our VID token each time they post a video.

# 🛠 Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (NextJs & Unit Testing)
- Ethers JS (Blockchain Interaction)
- Hardhat (Smart Contract Development Framework)
- Livepeer (Video storage && player)
- Web3.storage - IPFS (NFT File Storage)

# ⛓ Blockchain Protocol used

- ERC-20 standard
- ERC-721 standard

# ⚙ Requirements For Initial Setup
- Install NodeJS, should work with any node version below 18.12.1
- Install Hardhat in your terminal. You can check to see if you have hardhat by running `npx hardhat`. To install hardhat, run `npm install --save-dev hardhat`.

# 🚀 Quick Start

📄 Clone or fork Vidhub:

```
https://github.com/paschal533/Vidhub.git
```
💿 Install all dependencies:

```
$ cd vidhub
$ npm install
```

# 🎗 Add enviroment varibles

Rename the file `env.local.example` to `env.local`

Add all the required enviroment varibles in the file

```
NEXT_PUBLIC_SANITY_TOKEN = 
NEXT_PUBLIC_GOOGLE_API_TOKEN= 
NEXT_PUBLIC_BASE_URL= http://localhost:3000
NEXT_PUBLIC_CONTRACT_ADDRESS= 0x7ec205F8573E16678fE130A132a0956eEc79E9B2
NEXT_PUBLIC_API_KEY = //Your Livepeer API Key
NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID=
NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET=
```

# 🚴‍♂️ Run your App:

```
npm run dev
```

- Note :- This app was deploy to Polygon Mumbai testnet, so you need to connect your Metamask wallet to  Polygon Mumbai testnet before you can Interact with the app.

# 📄 interacting with the Smart-contract

Rename the file `env.example` to `env`

Add all the required enviroment varibles in the file

```
API_KEY =     //PolygonScan API_KEY
PrivateKey =  // Metamask PrivateKey
ProjectID =   // Infura ProjectID
```

# 🛠 Test the Smart-contract:

```
npx hardhat test
```

# 🎗 Compile the Smart-contract:

```
npx hardhat compile
```
# 🔗 Deploy the Smart-contract:

```
npx hardhat run --network mumbai scripts/deploy.js
```

# 📄 Smart-contract address

```
0x7ec205F8573E16678fE130A132a0956eEc79E9B2
```

# 📜 Mumbai Testnet Explorer

```
https://mumbai.polygonscan.com/address/0x7ec205F8573E16678fE130A132a0956eEc79E9B2
```