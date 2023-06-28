import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axiosClient from "../../../axiosClient";
import WatchlistButton from "../../Watchlist/WatchlistButton";

export default function HomeCard({ movie }) {
  function addMovie() {
    const options = {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    };
    axiosClient.post(`watchlist/${movie.id}`, {}, options);
  }
  return (
      <div className="home_page__wrapper">
        <WatchlistButton movieData={movie} />
        <Link to={`/movie/${movie.id}`}>Voir les détails</Link>
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
          alt={`Affiche du film ${movie.title}`}
        />
      </div>
  );
}
