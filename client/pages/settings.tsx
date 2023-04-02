import { NextPage } from "next";
import Layout from "../components/layout/Layout";
import RequireWallet from "../components/layout/RequireWallet";
import { useWallet } from "../hooks/useWallet";
import Avatar from "boring-avatars";
import { useChatContract } from "../hooks/useChatContract";
import { useEffect, useState } from "react";

const setting: NextPage = () => {
  const { currentAccount, connectWallet } = useWallet();
  const [inputtedName, setInputtedName] = useState("");
  const { getName, changeName } = useChatContract({ currentAccount });
  const [name, setName] = useState("");

  const onClickHandler = () => {
    changeName(inputtedName);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputtedName(e.target.value);
  };

  useEffect(() => {
    getUserName();
  }, [currentAccount]);

  const getUserName = async () => {
    const name = (await getName(currentAccount as string)) as string;
    setName(name);
  };

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        <div className="w-[80%] mx-auto mt-10 bg-white rounded-3xl">
          <div className="p-9">
            {/* account photo section */}
            <h3 className="text-2xl font-semibold">Profile Details</h3>
            <div className="relative w-full h-[100px] my-6">
              <div className="absolute inline-block w-[90px] h-[90px] top-0 bottom-0 mx-5 my-auto">
                <Avatar size={90} name={currentAccount} />
              </div>
              {/* edit section */}
              <div className="absolute inline-block w-[calc(100%-90px-2.5rem)] h-[70px] top-0 bottom-0 right-0 my-auto">
                <button className="block btn btn-sm btn-primary my-auto">
                  Use NFT
                </button>
                <small className="text-gray-600">
                  * NFT image ratio should be 1:1.
                </small>
              </div>
            </div>

            <div className="inline-block form-control w-full max-w-xs mx-3">
              <label className="label">
                <span className="label-text">User Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                defaultValue={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChangeHandler(e);
                }}
              />
            </div>
            <button
              onClick={() => {
                onClickHandler();
              }}
              className="inline-block btn btn-primary"
            >
              change
            </button>
          </div>
        </div>
      </RequireWallet>
    </Layout>
  );
};

export default setting;
