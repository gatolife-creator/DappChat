import { NextPage } from "next";
import { ReactNode } from "react";

const Main = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="w-full h-[64px]" />
      <main className="w-full">{children}</main>
    </>
  );
};

export default Main;
