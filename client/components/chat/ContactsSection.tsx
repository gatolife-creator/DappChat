import Avatar from "boring-avatars";

type UserType = {
  name: string;
  latestMessage: string;
  latestTime: number;
};

const ContactsSection = () => {
  const userInfo: UserType[] = [
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
    { name: "bob", latestMessage: "hello", latestTime: Date.now() },
  ];

  return (
    <div className="inline-block w-[350px] h-[75vh] bg-white rounded-3xl overflow-auto scrollbar-hide">
      {userInfo.map((user: UserType, index: number) => {
        return (
          <>
            <div key={index} className="relative w-full h-[5rem] border">
              <div className="relative w-[80px] h-full">
                <div className="absolute w-[50px] h-[50px] top-0 bottom-0 left-0 right-0 m-auto">
                  <Avatar
                    size={50}
                    name={user.name}
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
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ContactsSection;
