import UserProfile from '../../components/UserProfile/UserProfile';
import Watchlist from '../../components/Watchlist/Watchlist';

export default function Profil() {
  return (
    <div className="container">
      <Watchlist />
      <UserProfile />
    </div>
  );
}
