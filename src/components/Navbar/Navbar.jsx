import { useContext, useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import axiosClient from "../../axiosClient";
import { UserContext } from "../../Context/UserContext";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar() {
  const { setUser, user } = useContext(UserContext);
  const ref = useRef(null);
  const [click, setClick] = useState(false);
  const screenSize = useWindowSize();

  const getAuthToken = () => {
    const bearer = Cookies.get("token");
    return bearer ? `Bearer ${bearer}` : null;
  };

  const disconnect = async () => {
    if (!getAuthToken()) return;

    await axiosClient.delete("/logout", {
      headers: {
        Authorization: getAuthToken(),
      },
    });
    Cookies.remove("token");
    setUser(null);
  };

  function handleMenu() {
    setClick(!click);
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
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
            {user ? (
              <>
                <Link to="/" className="nav-link">
                  {user.email}
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
                        <p>Nom_utilisateur_01</p>
                      </div>
                      <Link to="/">Profil</Link>
                      <Link to="/">Watchlist</Link>
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
