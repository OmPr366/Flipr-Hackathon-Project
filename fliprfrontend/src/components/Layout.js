import { useDispatch } from "react-redux";
import ComplexNavbar from "./Navbar";
import { useEffect } from "react";
import { getUserFavoritePodcasts } from "@/actions/podcast";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";

export default function Layout({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      getUserFavoritePodcasts(userData._id).then((res) => {
        if (res.status == 200) {
          console.log(res.data, "All podcasts");
          dispatch(setFavPodcasts(res.data?.podcasts?.favourites));
          // create an array of fav podcasts Id and then set it to local storage

        }
      });
    } else {
      dispatch(setFavPodcasts([]));
    }
  }, []);

  return (
    <div className="pageContainer">
      <ComplexNavbar />
      <main>{children}</main>
    </div>
  );
}
