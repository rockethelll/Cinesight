import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axiosClient from '../../axiosClient';
import useSessionCookie from '../../createCookie';
import { UserContext } from '../../Context/UserContext';

function Signup() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: '', username: '', password: '', password_confirmation: ''  } });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const createUser = async (userInfos) => {
      const response = await axiosClient.post('/signup', userInfos);
      useSessionCookie(response);
      setUser(response.data.data);
      navigate(0);
    };

    const userData = JSON.stringify({ user: data });
    console.log(userData);
    createUser(userData);
    navigate('/');
  };

  return (
    <main className="form-container">
      <h1>Créer un compte</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-mail*</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email obligatoire !',
          })}
        />
        {errors.email && (
          <p style={{ color: '#e74c3c', margin: '-10px 0 10px' }}>
            {errors.email.message}
          </p>
        )}

        <label htmlFor="username">Pseudo</label>
        <input
          id="username"
          type="username"
          name="username"
          {...register('username', {
            minLength: {
              value: 3,
              message: '3 caractères minimum',
            },
            maxLength: {
              value: 20,
              message: '20 caractères maximum',
            },
          })}
        />
        {errors.username && (
        <p style={{ color: '#e74c3c', margin: '-10px ' }}>
          {errors.username.message}
        </p>
        )}

        <label htmlFor="password">Mot de passe*</label>
        <input
          id="password"
          type="password"
          name="password"
          {...register('password', {
            minLength: {
              value: 6,
              message: '6 caractères minimum',
            },
            required: 'Mot de passe obligatoire !',
          })}
        />
        {errors.password && (
          <p style={{ color: '#e74c3c', margin: '-10px ' }}>
            {errors.password.message}
          </p>
        )}

        <label htmlFor="password-confirmation">Confirmation*</label>
        <input
          id="password-confirmation"
          type="password"
          {...register('password_confirmation', {
            required: 'Mot de passe obligatoire !',
            validate: val => {
              if (watch('password') !== val) {
                return "Les mots de passe doivent être identiques"
              }
            }
          })}
        />
        {errors.password_confirmation && (
        <p style={{ color: '#e74c3c', margin: '-10px 0 10px' }}>{errors.password_confirmation.message}</p>
        )}

        <input className="submit" type="submit" value="Créer mon compte" />
      </form>
    </main>
  );
}

export default Signup;
