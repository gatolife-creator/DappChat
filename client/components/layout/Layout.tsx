import { ReactNode } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Main from "../Main";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Head>
        <title>KUChat</title>
        <meta
          name="description"
          content="KUChat ~Decentralized Educational Platform~"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Main>{children}</Main>
      </motion.div>
    </>
  );
}
