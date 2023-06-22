import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import useSessionCookie from '../../createCookie';
import { UserContext } from '../../Context/UserContext';

function Login() {
  const { setUserID } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createUser = async (data) => {
      const response = await axiosClient.post('/login', data);
      useSessionCookie(response);
      setUserID(response.data.data.id);
      navigate('/');
    };

    const [email, password] = e.target;
    const data = { user: { email: email.value, password: password.value } };
    createUser(data);
  };

  return (
    <main>
      <h1>Se connecter</h1>
      <h6>
        Connectez-vous avec votre email
      </h6>
      <p>
        Pas encore de compte ?
        <br />
        <Link
          to="/signup"
        >
          Créer un compte
        </Link>
      </p>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
        />

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          name="password"
        />

        <input
          className="submit"
          type="submit"
          value="Se connecter"
        />
      </form>
    </main>
  );
}

export default Login;
