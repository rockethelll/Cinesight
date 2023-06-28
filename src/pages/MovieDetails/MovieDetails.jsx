import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import axiosClient from '../../axiosClient';
import WatchlistButton from '../../components/Watchlist/WatchlistButton';
import Tags from '../../components/Tags/Tags';
import { UserContext } from '../../Context/UserContext';

function useMovie(id) {
  return useQuery(['movie', id], async () => {
    const { data } = await axiosClient.get(`/movie/${id}`);
    return data;
  });
}

export default function MovieDetails() {
  const { id } = useParams();
  const [more, setMore] = useState(false);
  const { user } = useContext(UserContext);
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  const movieQuery = useMovie(id);
  const {
    status: movieStatus,
    data: movieData,
    error: movieError,
  } = movieQuery;

  useEffect(() => {
    if (movieStatus === 'success') {
      document.title = `${movieData.title} - Movie Details`;
      return () => {
        document.title = 'Movie Details';
      };
    }
    return undefined;
  }, [movieStatus, movieData]);

  const handleMore = () => {
    setMore(!more);
  };

  if (movieStatus === 'loading') {
    return <p>Loading ...</p>;
  }

  if (movieStatus === 'error') {
    return (
      <p>
        Error:
        {movieError.message}
      </p>
    );
  }

  return (
    <div className="movie_details__wrapper">
      <div className="movie_details__header">
        <div className="tags_details__wrapper">
          <Tags tags={movieData.genres} />
        </div>
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
          alt={`Poster du film ${movieData.title}`}
        />
      </div>
      <div className="movie_details__body">
        <div className="movie_details--note--like">
          <div className="movie_details--note">
            <img src="../images/tmdb-logo.svg" alt="" />
            <p>
              {movieData.vote_average.toFixed(1)}
              /10
            </p>
          </div>
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <h2>{movieData.title}</h2>
            {user !== null ? <WatchlistButton movieData={movieData} /> : null}
          </div>
          <p>
            sorti le&nbsp;
            {new Date(movieData.release_date).toLocaleDateString()}
          </p>
        </div>
        <div className="movie_details--overview">
          <p className={more ? 'open' : 'closed'}>{movieData.overview}</p>
          <button type="button" onClick={handleMore}>
            {more ? 'Voir moins' : 'Voir plus'}
          </button>
        </div>
      </div>
    </div>
  );
}
