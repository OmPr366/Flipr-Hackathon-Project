import Image from "next/image";
import { Inter } from "next/font/google";
import ComplexNavbar from "@/components/Navbar";
import Homepage from "@/components/Homepage/Homepage";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/Redux/UserSlice";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ AllPodcasts }) {
  const dispatch = useDispatch();

  console.log(AllPodcasts, " podcasts");
  const getUser = async () => {
    const { data } = await axios.get(`http://localhost:3001/auth/user`, {
      withCredentials: true,
    });
    console.log(data);
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(setUser(data));
    } else {
      localStorage.removeItem("user");
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="pageContainer">
      <div>
        <ComplexNavbar />
        <Homepage AllPodcasts={AllPodcasts} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/api/podcast/get-allpodcasts`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { AllPodcasts: data?.podcasts } };
}
