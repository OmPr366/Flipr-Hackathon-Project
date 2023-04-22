import { useDispatch } from "react-redux";
import ComplexNavbar from "./Navbar";
import { useEffect } from "react";
import { getUserFavoritePodcasts } from "@/actions/podcast";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";
import { setPodcast } from "@/utils/Redux/PodcastSlice";

export default function Layout({ children }) {
  const dispatch = useDispatch();



  const updateCurrentPlaying = () => {
    const currentPlaying = JSON.parse(localStorage.getItem("currentpodcast"));
    dispatch(setPodcast(currentPlaying));
  };

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
    updateCurrentPlaying();
  }, []);

  return (
    <div className="pageContainer">
      <ComplexNavbar />
      <main>{children}</main>
    </div>
  );
}
