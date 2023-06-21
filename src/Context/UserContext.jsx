import { createContext, useMemo, useState } from 'react';

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [userID, setUserID] = useState(-1);
  const value = useMemo(() => ({ setUserID, userID }), [userID]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
