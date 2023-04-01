import Avatar from "boring-avatars";
import { timestampToDate } from "../../utils/conversion";

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
            <div className="chat-header">{name}</div>
            <div className="chat-bubble max-w-lg break-all">{text}</div>
            <time className="chat-footer opacity-50">
              {timestampToDate(timestamp)}
            </time>
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
            <div className="chat-header">{name}</div>
            <div className="chat-bubble max-w-lg break-all">{text}</div>
            <time className="chat-footer opacity-50">
              {timestampToDate(timestamp)}
            </time>
          </div>
        </>
      )}
    </>
  );
};

export default Bubble;
