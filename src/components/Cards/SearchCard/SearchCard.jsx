import { useContext } from 'react';
import WatchlistButton from '../../Watchlist/WatchlistButton';
import { UserContext } from '../../../Context/UserContext';

export default function SearchCard({ data }) {
  const { user } = useContext(UserContext);
  return (
    <div className="card">
      {user !== null && <WatchlistButton movieData={data} />}
      <a href={`/movie/${data.id}`} className="card--img">
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
          alt={data.original_title}
        />
      </a>
      <div className="card__content">
        <h3>{data.title}</h3>
        <p>{data.release_date}</p>
      </div>
    </div>
  );
}
