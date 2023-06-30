import {
  useContext, useState, useRef, useEffect,
} from 'react';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { useWindowSize } from '@uidotdev/usehooks';
import axiosClient from '../../axiosClient';
import { UserContext } from '../../Context/UserContext';
import Searchbar from '../Searchbar/Searchbar';
import Watchlist from '../Watchlist/Watchlist';

export default function Navbar() {
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const [openWatchlist, setOpenWatchlist] = useState(false);

  const ref = useRef(null);
  const [click, setClick] = useState(false);
  const screenSize = useWindowSize();

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
    setUser(null);
    navigate('/');
  };

  function handleMenu() {
    setClick(!click);
  }

  function handleWatchlist() {
    setOpenWatchlist(!openWatchlist);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setClick(false);
        setOpenWatchlist(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [click]);

  return (
    <nav>
      {screenSize.width > 1024 ? (
        <div className="nav-lg">
          <Link to="/" className="logo__wrapper">
            <img
              className="logo"
              src="../images/logo.svg"
              alt="cinesight logo"
            />
          </Link>
          <Searchbar />
          <div className="nav-group">
            {user !== null ? (
              <>
                <button type="button" onClick={handleWatchlist}>Ma watchlist</button>
                {openWatchlist && (
                  <>
                    <span className="background" />
                    <div className="watchlist--modal">
                      <div ref={ref}>
                        <Watchlist />
                      </div>
                    </div>
                  </>
                )}
                <Link to="/profil" className="nav-link">
                  {user.data.username !== null ? user.data.username : user.data?.email}
                </Link>
                <button type="button" onClick={disconnect}>
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/login" className="nav-link">
                Connexion
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="nav-sm">
          <Searchbar />

          <button type="button" onClick={handleMenu}>
            <img
              className="burger_menu"
              src="../images/burger_menu.svg"
              alt="burger menu icon"
            />
          </button>
          {click ? (
            <>
              <span className="background" />
              <div
                ref={ref}
                className="menu__wrapper"
                style={{ height: screenSize.height * 2 }}
              >
                <div className="menu">
                  <Link to="/">
                    <img
                      className="logo"
                      src="../images/logo.svg"
                      alt="cinesight logo"
                    />
                  </Link>
                  {user ? (
                    <>
                      <div className="user_section">
                        <div className="user_logo">
                          <div />
                        </div>
                        <p>{user.data.username || user.data.email}</p>
                      </div>
                      <Link to="/profil">Profil</Link>
                      <Link to="/profil#watchlist">Ma watchlist</Link>
                      <button type="button" onClick={disconnect}>
                        Déconnexion
                      </button>
                    </>
                  ) : (
                    <Link to="/login">Connexion</Link>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      )}
    </nav>
  );
}
