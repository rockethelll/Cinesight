import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosClient from '../axiosClient';
import { UserContext } from '../Context/UserContext';

function Navbar() {
  const { setUserID, userID } = useContext(UserContext);

  const getAuthToken = () => {
    const bearer = Cookies.get('token');
    return bearer ? `Bearer ${bearer}` : null;
  };

  const disconnect = async () => {
    if (!getAuthToken()) return;

    await axiosClient.delete('/logout', {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    Cookies.remove('token');
    setUserID(-1);
  };

  return (
    <nav>
      {userID >= 0 ? (
        <div>
          <button
            type="button"
            onClick={disconnect}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <>
          <Link to="/">Accueil</Link>
          <Link to="/login">Se connecter</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
