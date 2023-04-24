import { useDispatch } from "react-redux";
import ComplexNavbar from "./Navbar";
import { useEffect } from "react";
import { getUserFavoritePodcasts } from "@/actions/podcast";
import { setFavPodcasts } from "@/utils/Redux/FavPodcastSlice";
import { setPodcast } from "@/utils/Redux/PodcastSlice";
import { getPlaylist } from "@/actions/playlist";
import { setPlaylist } from "@/utils/Redux/PlaylistSlice";
import { useRouter } from "next/router";
import { setUser } from "@/utils/Redux/UserSlice";
import Footer from "./Footer";

export default function Layout({ children , isLogin }) {
  const dispatch = useDispatch();
  const Router = useRouter();


  const updateCurrentPlaying = () => {
    const currentPlaying = JSON.parse(localStorage.getItem("currentpodcast"));
    dispatch(setPodcast(currentPlaying));
  };

  const getPlaylistHandler = (userData) => {
    getPlaylist(userData?._id).then((res) => {
      if (res.status == 200) {
        dispatch(setPlaylist(res.data));
      }
    });
  };


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      dispatch(setUser(userData))
      getUserFavoritePodcasts(userData._id).then((res) => {
        if (res.status == 200) {
          dispatch(setFavPodcasts(res.data?.podcasts?.favourites));
          // create an array of fav podcasts Id and then set it to local storage

        }
      });
      getPlaylistHandler(userData);
    } else {
      dispatch(setFavPodcasts([]));
      if (isLogin) {
        Router.push("/sign-in");
      }
      dispatch(setUser(null))
    }
    updateCurrentPlaying();
  }, []);

  return (
    <div className="pageContainer">
      <ComplexNavbar />
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
