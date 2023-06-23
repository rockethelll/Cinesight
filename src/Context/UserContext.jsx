import { createContext, useMemo, useState } from 'react';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ setUser, user }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
