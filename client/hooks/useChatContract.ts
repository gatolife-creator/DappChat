import { useEffect, useState } from "react";
import { BigNumber, ethers } from 'ethers';
import abi from "../utils/Chat.json";
import { getEthereum } from "../utils/ethereum";
import { Chat } from "../typechain-types";

const CONTRACT_ADDRESS = "0x688a84251DD8c02760368ed3d9885D3667FFfa65";
const CONTRACT_ABI = abi.abi;

type PropsSendMessage = {
    currentAccount: string | undefined;
}

export const useChatContract = ({ currentAccount }: PropsSendMessage) => {
    const [processing, setProcessing] = useState(false);
    const [chatContract, setChatContract] = useState<Chat>();
    const [conversations, setConversations] = useState<Chat.MessageStructOutput[]>();

    const ethereum = getEthereum();

    async function getChatContract() {
        try {
            if (ethereum) {
                // @ts-ignore: ethereum as ethers.providers.ExternalProvider
                const provider = await new ethers.providers.Web3Provider(ethereum);
                const signer = await provider.getSigner();
                const ChatContract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    signer
                );
                setChatContract(chatContract);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function post(_to: string, _text: string) {
        if (!chatContract) return;
        try {
            const txn = await chatContract.post(_to, _text);
            setProcessing(true);
            await txn.wait();
            setProcessing(false);
        } catch (err) {
            console.log(err);
            alert("Failed to post");
        }
    }

    async function getConversations(_addr1: string, _addr2: string) {
        if (!chatContract) return;
        try {
            const conversations = await chatContract.getConversations(_addr1, _addr2);
            setConversations(conversations);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getChatContract();
    }, [currentAccount, ethereum]);

    return {
        processing,
        conversations,
        post,
        getConversations
    }
}
