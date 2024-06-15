const hre = require("hardhat");

async function main() {
  // Compile the contract if needed
  await hre.run('compile');

  // Deploy the contract
  const EtherBuzz = await hre.ethers.getContractFactory("EtherBuzz");
  const etherbuzz = await EtherBuzz.deploy();

  // Wait for the contract to be deployed
  await etherbuzz.deployed();

  // Log the contract address
  console.log(`Contract deployed to address: ${etherbuzz.address}`);

  // Check the contract code
  const provider = hre.ethers.provider;
  const code = await provider.getCode(etherbuzz.address);
  console.log(`Contract code at address: ${code}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
