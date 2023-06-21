import { Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import Searchbar from "./Searchbar/Searchbar";
import { useState, useRef } from "react";
import { useEffect } from "react";
const Navbar = () => {
  const ref = useRef(null);
  const [click, setClick] = useState(false);
  const screenSize = useWindowSize();
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
      {screenSize.width > 810 ? (
        <div className="nav-lg">
          <Link to="/" className="logo__wrapper">
            <img className="logo" src="../images/logo.svg" alt="" />
          </Link>
          <Searchbar />
          <div className="nav-group">
            <Link to="/signin" className="nav-link">
              Connexion
            </Link>
            <Link to="/signup" className="nav-link">
              Rejoindre Cinesight
            </Link>
          </div>
        </div>
      ) : (
        <div className="nav-sm">
          <Link to="/">
            <img className="logo" src="../images/logo.svg" alt="" />
          </Link>
          
          <button onClick={handleMenu}>
            <img
              className="burger_menu"
              src="../images/burger_menu.svg"
              alt=""
            />
          </button>
          {click ? (
            <>
              <span className="background"></span>
              <div
                ref={ref}
                className="menu__wrapper"
                style={{ height: screenSize.height * 2 }}
              >
                <div className="menu">
                  <div className="user_section">
                    <div className="user_logo">
                      <div></div>
                    </div>
                    <p>Nom_utilisateur_01</p>
                  </div>
                  {/* <Link to="/">Profil</Link>
                  <Link to="/">Watchlist</Link> */}
                  <Link to="/login">Connexion</Link>
                  <Link to="/signup">Inscription</Link>
                </div>
              </div>
            </>
            
          ) : (
            <></>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
