import { Link } from "react-router-dom";
import WatchlistButton from "../../Watchlist/WatchlistButton";
import { UserContext } from "../../../Context/UserContext";
import { useContext } from "react";

export default function HomeCard({ movie }) {
  const { user } = useContext(UserContext);
  return (
    <div className="home_page__wrapper">
      {user !== null ? <WatchlistButton movieData={movie} /> : null}
      <Link to={`/movie/${movie.id}`}>Voir les détails</Link>

      <img
        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
        alt={`Affiche du film ${movie.title}`}
      />
    </div>
  );
}
