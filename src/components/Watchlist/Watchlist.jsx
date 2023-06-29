import { useQuery } from "react-query";
import Cookies from "js-cookie";
import { useContext } from "react";
import axiosClient from "../../axiosClient";
import SearchCard from "../Cards/SearchCard/SearchCard";
import { UserContext } from "../../Context/UserContext";

function useWatchlist() {
  if (Cookies.get("token") !== undefined) {
    return useQuery({
      queryKey: ["watchlist"],
      queryFn: async () => {
        const { data } = await axiosClient.get("/watchlist", {
          headers: { Authorization: `Bearer ${Cookies.get("token")}` },
        });
        return data;
      },
    });
  }
  return null;
}

export default function Watchlist() {
  const { user } = useContext(UserContext);
  const { status, data } = useWatchlist();

  return (
    <div>
      {user !== null ? (
        <>
          <div className="reel" style={{ marginBottom: "2em" }}>
            {status === "success" &&
              data.length > 0 &&
              data.map((watchlistMovie) => (
                <SearchCard key={watchlistMovie.id} data={watchlistMovie} />
              ))}
            {status === "success" && data.length === 0 && (
              <p>Votre watchlist est vide</p>
            )}
            {status === "loading" && <p>Loading</p>}
          </div>
        </>
      ) : (
        <p>Connectez vous pour accèder à votre watchlist</p>
      )}
    </div>
  );
}
