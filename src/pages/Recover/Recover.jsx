import { useForm } from 'react-hook-form';
import axiosClient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';

function Recover() {
  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ defaultValues: { email: '' } });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const recoverPassword = async (userInfos) => {
      const response = await axiosClient.post('/users/password', userInfos);
      navigate('/');
    };

    const userData = JSON.stringify({ user: data });
    recoverPassword(userData);
  };

  return (
    <>
      <h1> Mot de passe oublié</h1>
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

        <input
          className="submit"
          type="submit"
          value="Envoyer la demande de réinitialisation"
        />
      </form>
    </>
  )
}

export default Recover;
