import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { EtherBuzzAddress, EtherBuzzABI } from "../Context/constants";

// Check if wallet is connected
export const CheckIfWalletConnected = async () => {
  try {
    if (!window.ethereum) {
      return console.log("Please connect to MetaMask");
    }

    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("1");
  }
};

// Connect wallet
export const ConnectWallet = async () => {
  try {
    if (!window.ethereum) {
      return console.log("Please connect to MetaMask");
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log("2");
  }
};

// Fetch contract
const fetchContract = (signerOrProvider) => new ethers.Contract(EtherBuzzAddress, EtherBuzzABI, signerOrProvider);

// Connect with contract
export const connectingWithContract = async () => {
  try {
    const web3Modal = new Web3Modal(); 
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(provider.getCode(EtherBuzzAddress));
    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log("3"+error);
  }
};
