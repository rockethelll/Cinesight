import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import SearchCard from "../../components/Cards/SearchCard/SearchCard";
import { Link } from "react-router-dom";

function useMovieByGenre(id) {
  return useQuery(["movie_by_genre", id], async () => {
    const { data } = await axiosClient.get(`/movies/discover?genre_id=${id}`);
    return data;
  });
}
export default function SearchByGenre() {
  const { id } = useParams();
  const searchByGenreQuery = useMovieByGenre(id);
  const { data } = searchByGenreQuery;
  return (
    <main>
      <h3 className="my-3" style={{ fontSize: "clamp(20px, 2vw, 3vw)" }}>
        Résultat de la recherche :
      </h3>
      <div className="auto-grid">
        {data && data.results.length > 0 ? (
          data.results.map((movie) => (
            <SearchCard key={movie.id} data={movie} />
          ))
        ) : (
          <>
            <p className="my-1">Aucun genre ne correspond</p>
            <Link to="/">Retour à l&apos; accueil</Link>
          </>
        )}
      </div>
    </main>
  );
}
