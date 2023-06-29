import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../../Context/UserContext';
import axiosClient from '../../axiosClient';

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { username: user.data.username } });

  const onSubmit = async (data) => {
    const updateUser = async (body) => {
      const options = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      };
      await axiosClient.patch('/profile', body, options);
      window.location.reload();
    };
    const userData = JSON.stringify({ user: data });
    updateUser(userData);
    navigate('/');
  };

  const deleteAccount = async () => {
    const deleteUserAccount = async () => {
    // eslint-disable-next-line no-alert
      if (window.confirm('Voulez-vous vraiment supprimer votre compte?')) {
        const options = {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        };
        await axiosClient.delete('/profile', options);
        // eslint-disable-next-line no-alert
        alert('Votre compte a été supprimé');
        window.location.reload();
      }
    };
    deleteUserAccount();
    navigate('/');
  };

  return (
    <>
      <div>UserProfile</div>
      <p>{user.data?.username}</p>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Pseudo</label>
        <input
          id="username"
          type="username"
          name="username"
          {...register('username', {
            minLength: {
              value: 3,
              message: '3 charactères minimum',
            },
          })}
        />
        {errors.username && (
          <p style={{ color: '#e74c3c', margin: '-10px ' }}>
            {errors.username.message}
          </p>
        )}

        <input className="submit" type="submit" value="Modifier" />
      </form>
      <input className="delete-account" type="submit" onClick={() => deleteAccount()} value="Supprimer votre compte" />
    </>
  );
}
