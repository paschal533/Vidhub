async function main() {
  console.log(`Preparing deployment...\n`)

  // Fetch contract to deploy
  const Token = await ethers.getContractFactory('Token')

  // Fetch accounts
  const accounts = await ethers.getSigners()

  console.log(`Accounts fetched:\n${accounts[0].address}\n${accounts[1].address}\n`)

  // Deploy contracts
  const dexToken = await Token.deploy('mSCT', 'SCT', '1000000')
  await dexToken.deployed()
  console.log(`DexToken Deployed to: ${dexToken.address}`)
 
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });