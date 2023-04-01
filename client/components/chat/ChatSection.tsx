import React from "react";
import { IoIosSend } from "react-icons/io";
import Bubble from "./Bubble";
import { useState, useEffect } from "react";
import { useChatContract } from "../../hooks/useChatContract";
import { useWallet } from "../../hooks/useWallet";
import { Chat } from "../../typechain-types";

type Props = {
  to: string;
  className?: string | undefined;
};

const ChatSection = ({ to, className }: Props) => {
  const [message, setMessage] = useState("");
  const { currentAccount } = useWallet();
  const { conversations, getConversations, processing, post } = useChatContract(
    {
      currentAccount,
    }
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMessage(e.target.value);
  };

  const onClickHandler = () => {
    post(to, message);
  };

  useEffect(() => {
    if (to) {
      getConversations(to);
    }
  }, [currentAccount, to]);

  return (
    <div className={`relative w-[calc(100%-400px)] h-[75vh] ${className}`}>
      <div
        className={`w-full h-[75vh] bg-white rounded-3xl overflow-scroll scrollbar-hide`}
      >
        <div className="w-full]">
          <div className="m-5">
            {conversations.map(
              (conversation: Chat.MessageStructOutput, index: number) => (
                <React.Fragment key={index}>
                  {currentAccount?.toLowerCase() ===
                    conversation.from.toLowerCase() && (
                    <Bubble
                      direction="right"
                      name={conversation.from.slice(0, 6)}
                      address={conversation.from}
                      timestamp={conversation.timestamp.toNumber()}
                      text={conversation.text}
                    />
                  )}
                  {currentAccount?.toLowerCase() ===
                    conversation.to.toLowerCase() && (
                    <Bubble
                      direction="left"
                      name={conversation.from.slice(0, 6)}
                      address={conversation.from}
                      timestamp={conversation.timestamp.toNumber()}
                      text={conversation.text}
                    />
                  )}
                </React.Fragment>
              )
            )}
            <div className="w-full h-[100px]" />
          </div>
        </div>
      </div>
      <div className="absolute table bottom-0 left-0 w-full h-[5rem] bg-white/30 backdrop-blur-sm">
        {/* NOTE 多分formに変更した方がいい */}
        <div className="absolute w-[95%] h-[48px] top-0 bottom-0 left-0 right-0 mx-auto my-auto">
          <input
            type="text"
            className="inline-block w-[calc(100%-72px)] input bg-[#F5F7FB]"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChangeHandler(e)
            }
          />
          {processing && (
            <button className="btn btn-circle btn-disabled loading float-right" />
          )}
          {!processing && (
            <button
              className="btn btn-circle btn-success float-right"
              onClick={() => onClickHandler()}
            >
              <IoIosSend fontSize={24} />
            </button>
          )}
          <div className="clear-right"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
