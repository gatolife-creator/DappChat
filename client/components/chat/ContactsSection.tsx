import { motion } from "framer-motion";
import Avatar from "boring-avatars";
import { useWallet } from "../../hooks/useWallet";
import { useChatContract } from "../../hooks/useChatContract";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export type UserType = {
  name: string;
  address: string;
  latestMessage: string;
  latestTime: number;
};

const ContactsSection = () => {
  const router = useRouter();
  const { currentAccount } = useWallet();
  const { getCorrespondents, correspondents } = useChatContract({
    currentAccount,
  });

  const userInfo = correspondents.map((correspondent: string) => {
    return {
      name: correspondent.slice(0, 6),
      address: correspondent,
      latestMessage: "latestMessage",
      latestTime: Date.now(),
    };
  });

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    address: string
  ) => {
    e.preventDefault();
    router.push(`/chat?to=${address}`);
  };

  useEffect(() => {
    getCorrespondents();
  }, [currentAccount]);

  return (
    <div className="inline-block w-[350px] h-[75vh] bg-white rounded-3xl overflow-auto scrollbar-hide">
      {userInfo.map((user: UserType, index: number) => {
        return (
          <motion.div
            key={index}
            className="relative w-full h-[5rem] border hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
              handleClick(e, user.address);
            }}
          >
            <div className="relative w-[80px] h-full">
              <div className="absolute w-[50px] h-[50px] top-0 bottom-0 left-0 right-0 m-auto">
                <Avatar
                  size={50}
                  name={user.address}
                  variant="marble"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                />
              </div>
            </div>
            <div className="absolute w-[calc(100%-80px)] h-full top-0 left-[80px]">
              <div className="w-full h-full p-3">
                <p className="inline text-lg font-semibold">{user.name}</p>
                <p className="float-right text-gray-500">{user.latestTime}</p>
                <br />
                <p className="inline text-gray-500 truncate clear-right">
                  {user.latestMessage}
                </p>
              </div>
            </div>
            <hr />
          </motion.div>
        );
      })}
    </div>
  );
};

export default ContactsSection;
