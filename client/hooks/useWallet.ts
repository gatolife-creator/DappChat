import { useEffect, useState } from "react";
import { getEthereum } from "../utils/ethereum";

type ReturnUseWallet = {
  currentAccount: string | undefined;
  connectWallet: () => void;
};

export const useWallet = (): ReturnUseWallet => {
  const [currentAccount, setCurrentAccount] = useState<string>();

  const ethereum = getEthereum();

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (!Array.isArray(accounts)) return;
      console.log("Connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        alert("Make sure you have MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (!Array.isArray(accounts)) return;
      if (accounts.length !== 0) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return {
    currentAccount,
    connectWallet,
  };
};
