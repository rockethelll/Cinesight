import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import axiosClient from '../axiosClient';

function useMovie(id) {
  return useQuery({
    queryKey: ['movie'],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/movie/${id}`);
      return data;
    },
  });
}
export default function MovieDetails() {
  const { id } = useParams();
  const [more, setMore] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  const {
    // eslint-disable-next-line no-unused-vars
    status, data, error, isFetching,
  } = useMovie(id);
  let date;

  function handleMore() {
    setMore(!more);
  }

  function formatDate() {
    date = new Date(data.release_date);
  }

  if (status === 'success') {
    formatDate();
  }
  if (status === 'loading') {
    return <p>Loading ...</p>;
  }

  if (status === 'error') {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }
  return (
    <div className="movie_details__wrapper">
      <div className="movie_details__header">
        <img
          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
          alt=""
        />
      </div>
      <div className="movie_details__body">
        <div className="movie_details--note--like">
          <div className="movie_details--note">
            <img src="../images/tmdb-logo.svg" alt="" />
            <p>
              {data.vote_average}
              /10
            </p>
          </div>
          <img src="../images/hearth.svg" alt="" />
        </div>
        <div>
          <h2>{data.title}</h2>
          <p>
            sortie le
            {' '}
            {date.toLocaleDateString()}
          </p>
        </div>
        <div className="movie_details--overview">
          <p className={`${more ? 'open' : 'closed'}`}>{data.overview}</p>
          <button type="button" onClick={handleMore}>
            {`${more ? 'Voir moins' : 'Voir plus'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
