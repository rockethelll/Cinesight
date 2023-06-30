import { Link } from 'react-router-dom';

export default function Tags({ movie }) {
  return (
    <>
      {movie.genres.slice(0, 2).map((genre) => (
        <div key={genre.id} className="tag__wrapper">
          <Link to={`/movie_by_genre/${genre.id}`} className="tag">
            {genre.name}
          </Link>
        </div>
      ))}
    </>
  );
}
