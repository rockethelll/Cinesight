import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../../Context/UserContext';
import axiosClient from '../../axiosClient';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [editEmail, setEditEmail] = useState('');
  const [editUsername, setEditUsername] = useState('');
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleEdit = async () => {
    const data = {
      email: editEmail || user.data.email,
      username: editUsername || user.data.username,
    };
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
    setEditEmail('');
    setEditUsername('');
    setIsEditing(false);
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
    <div className="user-edit">
      <h1>Éditer votre profil</h1>
      {isEditing ? (
        <div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              defaultValue={editEmail || user.data.email}
              id="email"
              onChange={(e) => setEditEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Pseudo</label>
            <input
              defaultValue={editUsername || user.data.username}
              id="username"
              onChange={(e) => setEditUsername(e.target.value)}
            />
          </div>
        </div>
      ) : (
        <>
          <p>{user.data?.email}</p>
          <p>{user.data?.username}</p>
        </>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button type="button" onClick={() => handleEdit()}>Valider</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>Éditer</button>
        )}
      </div>
      <input className="delete-account" type="submit" onClick={() => deleteAccount()} value="Supprimer votre compte" />
    </div>
  );
}
