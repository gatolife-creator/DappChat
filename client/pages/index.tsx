import type { NextPage } from "next";
import Card from "../components/Card";
import Layout from "../components/layout/Layout";

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3 mt-10">
          <Card
            title="Chat"
            description="description"
            link="/chat"
            className="mx-auto"
          />
        </div>
      </Layout>
    </>
  );
};

export default Home;
