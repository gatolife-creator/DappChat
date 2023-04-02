import React from "react";
import { IoIosSend } from "react-icons/io";
import Scrollbars from "react-custom-scrollbars-2";
import Bubble from "./Bubble";
import { useEffect } from "react";
import { useChatContract } from "../../hooks/useChatContract";
import { useWallet } from "../../hooks/useWallet";
import { Chat } from "../../typechain-types";
import { Dna } from "react-loader-spinner";

type Props = {
  to: string;
  className?: string | undefined;
};

const ChatSection = ({ to, className }: Props) => {
  const { currentAccount } = useWallet();
  const { conversations, getConversations, processing, post } = useChatContract(
    {
      currentAccount,
    }
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { message } = e.target as any;

    if (message.value.trim()) {
      post(to, message.value);
      message.value = "";
    }
  };

  useEffect(() => {
    if (to) {
      getConversations(to);
    }
  }, [currentAccount, to]);

  return (
    <div className={`relative w-[calc(100%-400px)] h-[75vh] ${className}`}>
      <Scrollbars autoHide className="w-full h-[75vh] bg-white rounded-3xl">
        <div className="w-full min-h-full">
          {processing && (
            <Dna
              visible={true}
              height="80px"
              width="80px"
              ariaLabel="dna-loading"
              wrapperClass=" absolute top-0 bottom-0 left-0 right-0 mx-auto my-auto"
            />
          )}

          {!processing && (
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
          )}
        </div>
      </Scrollbars>

      <div className="absolute table bottom-0 left-0 w-full h-[5rem]">
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}
          className="absolute w-[95%] h-[48px] top-0 bottom-0 left-0 right-0 mx-auto my-auto"
        >
          <input
            type="text"
            name="message"
            className="inline-block w-[calc(100%-72px)] input bg-[#F5F7FB]"
          />
          {processing && (
            <button className="btn btn-circle btn-disabled loading float-right" />
          )}
          {!processing && (
            <button
              type="submit"
              className="btn btn-circle btn-success float-right"
            >
              <IoIosSend fontSize={24} />
            </button>
          )}
          <div className="clear-right" />
        </form>
      </div>
    </div>
  );
};

export default ChatSection;
