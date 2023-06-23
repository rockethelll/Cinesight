import { useForm } from 'react-hook-form';
import axiosClient from '../../axiosClient';
import { useNavigate } from 'react-router-dom';

function PasswordEdit() {
  const navigate = useNavigate();

  // Getting reset password token from URL
  const params = new URLSearchParams(document.location.search);
  const reset_password_token = params.get("reset_password_token");

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ 
    defaultValues: { 
      password: null,
      password_confirmation: null,
    } 
  });

  const onSubmit = async (data) => {
    const editPassword = async (userInfos) => {
      const response = await axiosClient.patch('/password', userInfos);
      navigate('/login');
    };

    const dataWithToken = {
      ...data,
      reset_password_token: reset_password_token
    }

    const userData = JSON.stringify({ user: dataWithToken });
    editPassword(userData);
  };

  return (
    <>
      <h1> Nouveau mot de passe</h1>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Mot de passe obligatoire !',
          })}
        />
        {errors.password && (
        <p style={{ color: '#e74c3c', margin: '-10px 0 10px' }}>{errors.password.message}</p>
        )}

        <label htmlFor="password-confirmation">Confirmation</label>
        <input
          id="password-confirmation"
          type="password"
          {...register('password_confirmation', {
            required: 'Mot de passe obligatoire !',
          })}
        />
        {errors.password_confirmation && (
        <p style={{ color: '#e74c3c', margin: '-10px 0 10px' }}>{errors.password_confirmation.message}</p>
        )}

        <input
          className="submit"
          type="submit"
          value="Editer le mot de passe"
        />
      </form>
    </>
  )
}

export default PasswordEdit;
