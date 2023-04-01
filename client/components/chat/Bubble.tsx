import Avatar from "boring-avatars";

type Props = {
  direction: "left" | "right";
  name: string;
  address: string;
  timestamp: number;
  text: string;
};

const Bubble = ({ direction, name, address, timestamp, text }: Props) => {
  return (
    <>
      {direction === "left" && (
        <>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Avatar
                  size={40}
                  name={address}
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
            <div className="chat-header">
              {name}
              <time className="text-xs opacity-50">{timestamp}</time>
            </div>
            <div className="chat-bubble max-w-lg break-all">{text}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </>
      )}
      {direction === "right" && (
        <>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <Avatar
                  size={40}
                  name={address}
                  variant="marble"
                  colors={[
                    "#92A1C6",
                    "#146A7C",
                    "#F0AB3D",
                    "#C271B4",
                    "#C20D90",
                  ]}
                ></Avatar>
              </div>
            </div>
            <div className="chat-header">
              {name}
              <time className="text-xs opacity-50">{timestamp}</time>
            </div>
            <div className="chat-bubble max-w-lg break-all">{text}</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </>
      )}
    </>
  );
};

export default Bubble;