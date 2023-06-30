import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import SearchCard from "../../components/Cards/SearchCard/SearchCard";

function useMovieByGenre(id) {
  return useQuery(["movie_by_genre", id], async () => {
    const { data } = await axiosClient.get(`/movies/discover?genre_id=${id}`);
    return data;
  });
}
export default function SearchByGenre() {
  const { id } = useParams();
  const searchByGenreQuery = useMovieByGenre(id);
  const { status, data, error } = searchByGenreQuery;

  return (
    <main>
      <h3 className="my-3" style={{ fontSize: "2vw" }}>
        Résultat de la recherche :
      </h3>
      <div className="auto-grid">
        {data && data.results.map((movie) => <SearchCard key={movie.id} data={movie} />)}
      </div>
    </main>
  );
}
