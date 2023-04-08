import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="w-full h-[64px]" />
      <main className="w-full">{children}</main>
    </>
  );
};

export default Main;
