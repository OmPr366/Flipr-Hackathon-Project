import Layout from "@/components/Layout";
import Dashboard from "@/components/dashboard";
import React from "react";

const index = () => {
  return (
    <div className="  justify-center content-center flex pb-10 ">
      <div
        style={{
          maxWidth: "1000px",
          width: "100%",
        }}
      >
        <Layout>
          <Dashboard />
        </Layout>
      </div>
    </div>
  );
};

export default index;
