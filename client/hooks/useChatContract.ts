import { useEffect, useState } from "react";
import { BigNumber, ethers } from 'ethers';
import abi from "../utils/Chat.json";
import { getEthereum } from "../utils/ethereum";
import { Chat } from "../typechain-types";

const CONTRACT_ADDRESS = "0xD1ecd558AC7ebD8e69D2Fbad8622aE2A70c2a2aB";
const CONTRACT_ABI = abi.abi;

type PropsSendMessage = {
    currentAccount: string | undefined;
}

export const useChatContract = ({ currentAccount }: PropsSendMessage) => {
    const [processing, setProcessing] = useState(false);
    const [chatContract, setChatContract] = useState<Chat>();
    const [correspondents, setCorrespondents] = useState<string[]>([]);
    const [conversations, setConversations] = useState<Chat.MessageStructOutput[]>([]);

    const ethereum = getEthereum();

    async function getChatContract() {
        try {
            if (ethereum) {
                // @ts-ignore: ethereum as ethers.providers.ExternalProvider
                const provider = new ethers.providers.Web3Provider(ethereum);
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

    async function getConversations(_addr: string) {
        if (!chatContract) return;
        try {
            const conversations = await chatContract.getConversations(_addr);
            setConversations(conversations);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getChatContract();
    }, [currentAccount, ethereum]);

    useEffect(() => {
        const onPost = (
            _to: string,
            _from: string,
            _text: string,
            _timestamp: number
        ) => {
            console.log("post from %s to %s", _from, _to);
            if (_to.toLocaleLowerCase() === currentAccount) {
                getConversations(_from);
            } else if (_from.toLocaleLowerCase() === currentAccount) {
                getConversations(_to);
            }
        };

        if (chatContract) {
            chatContract.on("onPost", onPost);
        }

        return () => {
            if (chatContract) {
                chatContract.off("onPost", onPost);
            }
        }
    }, [chatContract]);

    return {
        processing,
        conversations,
        correspondents,
        post,
        getCorrespondents,
        getConversations
    }
}
