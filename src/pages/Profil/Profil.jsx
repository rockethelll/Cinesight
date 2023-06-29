import { Link } from 'react-router-dom';
import Watchlist from '../../components/Watchlist/Watchlist';

export default function Profil() {
  return (
    <div className="container">
      <Watchlist />
      <Link to="/profil/edit" className="edit-button">
        Éditer mon profil
      </Link>
    </div>
  );
}
