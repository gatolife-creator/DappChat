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
        await requestSwitchNetwork();
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const requestSwitchNetwork = async () => {
    if (!ethereum) {
      return;
    }

    const targetId = "0x13881";
    const currentChainId = await ethereum.request({
      method: 'eth_chainId',
    });

    if (currentChainId !== targetId) {
      try {
        await ethereum?.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        })
      } catch (error) {
        try {
          await ethereum?.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                chainName: 'Mumbai Mainnet',
                nativeCurrency: {
                  decimals: 18,
                  name: 'Polygon',
                  symbol: 'MATIC'
                },
                rpcUrls: ['https://matic-mumbai.chainstacklabs.com']
              },
            ],
          })
        } catch (err) {
          console.log(err);
        }
      }

    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return {
    currentAccount,
    connectWallet,
  };
};
