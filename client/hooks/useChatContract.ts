import { useEffect, useState } from "react";
import { BigNumber, ethers } from 'ethers';
import abi from "../utils/Chat.json";
import { getEthereum } from "../utils/ethereum";
import { Chat } from "../typechain-types";

const CONTRACT_ADDRESS = "0x1046DC619f31296455aCBBf76687B36C80d92113";
const CONTRACT_ABI = abi.abi;

type PropsSendMessage = {
    currentAccount: string | undefined;
}

export const useChatContract = ({ currentAccount }: PropsSendMessage) => {
    const [processing, setProcessing] = useState(false);
    const [chatContract, setChatContract] = useState<Chat>();
    const [correspondents, setCorrespondents] = useState<string[]>([]);
    const [conversations, setConversations] = useState<Chat.MessageStructOutput[]>();

    const ethereum = getEthereum();

    async function getChatContract() {
        try {
            if (ethereum) {
                // @ts-ignore: ethereum as ethers.providers.ExternalProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
                console.log(provider);
                const signer = provider.getSigner();
                const ChatContract = new ethers.Contract(
                    CONTRACT_ADDRESS,
                    CONTRACT_ABI,
                    signer
                ) as unknown;
                setChatContract(ChatContract as Chat);
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function post(_to: string, _text: string) {
        if (!chatContract) {
            console.log("No chat contract");
            return;
        };
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

    async function getCorrespondents() {
        if (!chatContract) return;
        try {
            const correspondents = await chatContract.getCorrespondents();
            setCorrespondents(correspondents);
        } catch (err) {
            console.log(err);
        }
    }

    async function getConversations(_addr1: string, _addr2: string) {
        if (!chatContract) return;
        try {
            const conversations = await chatContract.getConversations(_addr1, _addr2);
            console.log(conversations);
            setConversations(conversations);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getChatContract();
    }, [currentAccount, ethereum, conversations]);

    return {
        processing,
        conversations,
        correspondents,
        post,
        getCorrespondents,
        getConversations
    }
}
