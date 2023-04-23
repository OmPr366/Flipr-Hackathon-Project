import Layout from "@/components/Layout";
import UpdatePodcast from "@/components/dashboard/UpdatePodcast";
import React from "react";

const id = ({ data }) => {
  console.log(data, " Data is ");
  return (
    <Layout>
      <div className="w-full">
        <UpdatePodcast podcastData={data} />
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const fetchData = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-allpodcasts`
  );
  const parsedData = await fetchData.json();

  let data = {};
  parsedData?.podcasts?.map((e, i) => {
    if (e._id == params.id) {
      data = e;
    }
  });
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const object = {
    paths: [],
    fallback: false,
    revalidate:1
  };
  const data = await fetch(
    `https://fipr-backend.onrender.com/api/podcast/get-allpodcasts`
  );
  const parsedData = await data.json();

  parsedData?.podcasts?.map((e, i) => {
    object.paths.push({
      params: {
        id: e._id,
      },
    });
  });
  return object;
}

export default id;
