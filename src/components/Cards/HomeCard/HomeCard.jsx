import { Link } from 'react-router-dom';

export default function HomeCard({ data }) {
  return (
    <div className="home_page__wrapper">
      <Link to={`/movie/${data.id}`}>Voir les détails</Link>
      <img
        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`}
        alt={`Affiche du film ${data.title}`}
      />
    </div>
  );
}
