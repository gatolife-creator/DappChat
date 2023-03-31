import { ethers } from "hardhat";

const main = async () => {
  const ChatFactory = await ethers.getContractFactory("Chat");
  const Chat = await ChatFactory.deploy();
  await Chat.deployed();
  console.log("Deployed at: ", Chat.address);

  const TippingSystemFactory = await ethers.getContractFactory("TippingSystem");
  const TippingSystem = await TippingSystemFactory.deploy();
  await TippingSystem.deployed();
  console.log("Deployed at: ", TippingSystem.address);
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

runMain();