import { NextPage } from "next";
import { useRouter } from "next/router";
import { AiFillSetting } from "react-icons/ai";
import Layout from "../components/layout/Layout";
import { useWallet } from "../hooks/useWallet";
import RequireWallet from "../components/layout/RequireWallet";
import ContactsSection from "../components/chat/ContactsSection";
import ChatSection from "../components/chat/ChatSection";
import NewFriendModal from "../components/chat/NewFriendModal";

const chat: NextPage = () => {
  const router = useRouter();
  const to = router.query.to as string;
  const { currentAccount, connectWallet } = useWallet();

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        <div className="w-[90%] mx-auto">
          <div className="w-full h-[5.5rem] table">
            {/* <input
              type="text"
              className="block absolute top-0 bottom-0 my-auto input input-bordered w-[350px]"
            /> */}
            <div className="absolute top-0 bottom-0 right-0 my-auto h-[48px]">
              <NewFriendModal />
              <button className="btn btn-primary gap-1 mx-2">
                <AiFillSetting fontSize={24} />
                setting
              </button>
            </div>
          </div>
          <div className="w-full clear-right">
            <ContactsSection />
            <ChatSection
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
