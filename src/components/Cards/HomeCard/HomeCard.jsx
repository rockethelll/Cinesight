import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axiosClient from "../../../axiosClient";
import WatchlistButton from "../../Watchlist/WatchlistButton";

export default function HomeCard({ movie }) {
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
