import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axiosClient from "../../axiosClient";
import Tags from "../../components/Tags/Tags";

function useMovie(id) {
  return useQuery({
    queryKey: ["movie"],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/movie/${id}`);
      return data;
    },
  });
}
export default function MovieDetails() {
  const { id } = useParams();
  const [more, setMore] = useState(false);
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = useMovie(id);

  let date;
  let note;
  let genres

  function handleMore() {
    setMore(!more);
  }

  function formatDate(dateToFormat) {
    return new Date(dateToFormat);
  }

  function truncateNote(num) {
    return Math[num < 0 ? "ceil" : "floor"](num);
  }

  function getGenres() {
    data.genres.slice(0, 2).map((genre) => console.log(genre));
  }

  if (status === "success") {
    date = formatDate(data.release_date);
    note = truncateNote(data.vote_average * 100) / 100;
    getGenres()
  }
  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (status === "error") {
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
          alt={`Poster du film ${data.title}`}
        />
        <div className="genres__wrapper">
          {data.genres.slice(0, 2).map((genre) => <Tags name={genre.name} />)}
        </div>
      </div>
      <div className="movie_details__body">
        <div className="movie_details--note--like">
          <div className="movie_details--note">
            <img src="../images/tmdb-logo.svg" alt="" />
            <p>{note}/10</p>
          </div>
          <img src="../images/hearth.svg" alt="" />
        </div>
        <div>
          <h2>{data.title}</h2>
          <p>sortie le {date.toLocaleDateString()}</p>
        </div>
        <div className="movie_details--overview">
          <p className={`${more ? "open" : "closed"}`}>{data.overview}</p>
          <button type="button" onClick={handleMore}>
            {`${more ? "Voir moins" : "Voir plus"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
