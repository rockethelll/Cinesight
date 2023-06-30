import WatchlistButton from '../../Watchlist/WatchlistButton';

export default function SearchCard({ data }) {
  return (
    <div className="card">
      <WatchlistButton movieData={data} />
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
