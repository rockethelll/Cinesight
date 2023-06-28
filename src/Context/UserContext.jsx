import Cookies from "js-cookie";
import { useEffect } from "react";
import { createContext, useMemo, useState } from "react";
import axiosClient from "../axiosClient";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getData() {
    const cookie = Cookies.get("token");
    if (cookie !== undefined) {
      const data = await axiosClient.get("/current_user", {
        headers: { Authorization: `Bearer ${cookie}` },
      });
      setUser(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
