import { IoIosSend } from "react-icons/io";
import Bubble from "./Bubble";

type Props = {
  correspondent?: string | undefined;
  className?: string | undefined;
};

const ChatSection = ({ correspondent, className }: Props) => {
  return (
    <div className={`relative w-[calc(100%-400px)] h-[75vh] ${className}`}>
      <div
        className={`w-full h-[75vh] bg-white rounded-3xl overflow-scroll scrollbar-hide`}
      >
        <div className="w-full]">
          <div className="m-5">
            <Bubble
              direction="left"
              name="left man"
              address="left address"
              timestamp={Date.now()}
              text="This is left side."
            />
            <Bubble
              direction="right"
              name="right man"
              address="right address"
              timestamp={Date.now()}
              text="This is right side."
            />
            <Bubble
              direction="left"
              name="left man"
              address="left address"
              timestamp={Date.now()}
              text="This is left side."
            />
            <Bubble
              direction="right"
              name="right man"
              address="right address"
              timestamp={Date.now()}
              text="This is right side."
            />
            <Bubble
              direction="left"
              name="left man"
              address="left address"
              timestamp={Date.now()}
              text="This is left side."
            />
            <Bubble
              direction="right"
              name="right man"
              address="right address"
              timestamp={Date.now()}
              text="This is right side."
            />
            <Bubble
              direction="left"
              name="left man"
              address="left address"
              timestamp={Date.now()}
              text="This is left side."
            />
            <Bubble
              direction="right"
              name="right man"
              address="right address"
              timestamp={Date.now()}
              text="This is right side."
            />
            <Bubble
              direction="left"
              name="left man"
              address="left address"
              timestamp={Date.now()}
              text="This is left side."
            />
            <Bubble
              direction="right"
              name="right man"
              address="right address"
              timestamp={Date.now()}
              text="This is right side."
            />
            <div className="w-full h-[100px]" />
          </div>
        </div>
      </div>
      <div className="absolute table bottom-0 left-0 w-full h-[5rem]">
        <div className="absolute w-[95%] h-[48px] top-0 bottom-0 left-0 right-0 mx-auto my-auto">
          <input
            type="text"
            className="inline-block w-[calc(100%-72px)] input bg-[#F5F7FB]"
          />
          <button className="btn btn-circle btn-success float-right">
            <IoIosSend fontSize={24} />
          </button>
          <div className="clear-right"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
