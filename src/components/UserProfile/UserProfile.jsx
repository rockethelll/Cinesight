import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../../Context/UserContext';
import axiosClient from '../../axiosClient';

export default function UserProfile() {
  const { user } = useContext(UserContext);
  const [username, setUsername] = useState(user.data.username);
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
      navigate(0);
    };
    const userData = JSON.stringify({ user: data });
    updateUser(userData);
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
    </>
  );
}
