import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiFillSetting, AiOutlineUserAdd } from "react-icons/ai";
import Layout from "../components/layout/Layout";
import { useChatContract } from "../hooks/useChatContract";
import { useWallet } from "../hooks/useWallet";
import RequireWallet from "../components/layout/RequireWallet";
import ContactsSection, { UserType } from "../components/chat/ContactsSection";
import ChatSection from "../components/chat/ChatSection";
import AddFriendModal from "../components/chat/AddFriendModal";

const chat: NextPage = () => {
  const [text, setText] = useState("");
  const router = useRouter();
  const to = router.query.to as string;
  const { currentAccount, connectWallet } = useWallet();
  const {
    processing,
    conversations,
    correspondents,
    post,
    getCorrespondents,
    getConversations,
  } = useChatContract({ currentAccount });

  const userInfo: UserType[] = correspondents.map((address: string) => {
    return {
      name: address.slice(0, 6),
      latestMessage: "hello",
      latestTime: Date.now(),
    };
  });

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        <div className="w-[90%] mx-auto">
          <div className="w-full h-[5.5rem] table">
            <input
              type="text"
              className="block absolute top-0 bottom-0 my-auto input input-bordered w-[350px]"
            />
            <div className="absolute top-0 bottom-0 right-0 my-auto h-[48px]">
              <AddFriendModal />
              <button className="btn btn-primary gap-1 mx-2">
                <AiFillSetting fontSize={24} />
                setting
              </button>
            </div>
          </div>
          <div className="w-full clear-right">
            <ContactsSection userInfo={userInfo} />
            <ChatSection
              correspondent={currentAccount}
              to={to}
              className="float-right"
            />
          </div>
        </div>
      </RequireWallet>
    </Layout>
  );
};

export default chat;
