import Cookies from 'js-cookie';
import {
  useEffect, createContext, useMemo, useState,
} from 'react';
import axiosClient from '../axiosClient';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user]);

  async function getData() {
    const cookie = Cookies.get('token');
    if (cookie !== undefined) {
      const data = await axiosClient.get('/current_user', {
        headers: { Authorization: `Bearer ${cookie}` },
      });
      setUser(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
