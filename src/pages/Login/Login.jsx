import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axiosClient';
import useSessionCookie from '../../createCookie';
import { UserContext } from '../../Context/UserContext';

function Login() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ defaultValues: { email: '', password: '' } });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const createUser = async (userInfos) => {
      const response = await axiosClient.post('/login', userInfos);
      useSessionCookie(response);
      setUser(response.data.data);
      navigate('/');
    };

    const userData = JSON.stringify({ user: data });
    createUser(userData);
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
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email obligatoire !',
          })}
        />
        {errors.email && (
        <p style={{ color: '#e74c3c', margin: '-10px 0 10px' }}>{errors.email.message}</p>
        )}

        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          name="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: '6 charactères minimum',
            },
            required: 'Mot de passe obligatoire !',
          })}
        />
        {errors.password && (
        <p style={{ color: '#e74c3c', margin: '-10px ' }}>{errors.password.message}</p>
        )}

        <Link to="/recover"> Mot de passe oublié ?</Link>

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
