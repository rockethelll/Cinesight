import { Link } from 'react-router-dom';
import Watchlist from '../../components/Watchlist/Watchlist';

export default function Profil() {
  return (
    <div className="container">
      <div id="watchlist">
        <h3>Ma watchlist</h3>
        <Watchlist />
      </div>
      <Link to="/profil/edit" className="edit-button">
        Éditer mon profil
      </Link>
    </div>
  );
}
