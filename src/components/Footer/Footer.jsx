import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container footer__wrapper">
        <div>
          <p>Liens utiles</p>
          <Link to="/">Accueil</Link>
          <Link to="/login">Connexion</Link>
          <Link to="/signup">Inscription</Link>
          <Link to="/about">Comment ça marche ?</Link>
        </div>
        <div>
          <p>À propos de nous</p>
          <Link target="_blank" to="https://github.com/rockethelll">
            - Alec
          </Link>
          <Link target="_blank" to="https://github.com/TGianella">
            - Théo
          </Link>
          <Link target="_blank" to="https://github.com/1996thomas">
            - Thomas
          </Link>
          <Link target="_blank" to="https://developer.themoviedb.org/docs">
            Merci à
            {' '}
            <strong>TMDB</strong>
            {' '}
            pour leur API
          </Link>
        </div>
        <div>
          <img src="../images/logo.svg" alt="" />
        </div>
      </div>
    </footer>
  );
}
