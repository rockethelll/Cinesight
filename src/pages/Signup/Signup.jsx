import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import useSessionCookie from '../../createCookie';
import { UserContext } from '../../Context/UserContext';

function Signup() {
  const { setUserID } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createUser = async (data) => {
      const response = await axiosClient.post('/signup', data);
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
      <h1>Créer un compte</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="wrapper__email">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
          />
        </div>

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          name="password"
        />

        <input
          type="submit"
          value="Se connecter"
        />
      </form>
    </main>
  );
}

export default Signup;
