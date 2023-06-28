import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axiosClient from '../../axiosClient';

function useWatchList() {
  return useQuery('watchlist', async () => {
    const options = {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    const { data } = await axiosClient.get('watchlist/', options);
    return data;
  });
}

export default function WatchlistButton({ movieData }) {
  const queryClient = useQueryClient();
  const [inWatchlist, setInWatchlist] = useState(false);
  const watchListQuery = useWatchList();

  useEffect(() => {
    if (watchListQuery.isSuccess) {
      const movieInWatchlist = watchListQuery.data.find(
        (movie) => movie.id === movieData.id,
      );
      setInWatchlist(!!movieInWatchlist);
    }
  }, [watchListQuery.data, movieData.id]);

  const addToWatchlist = async () => {
    const options = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    await axiosClient.post(`watchlist/${movieData.id}`, {}, options);
    queryClient.invalidateQueries('watchlist');
  };

  const removeFromWatchlist = async () => {
    const options = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
    await axiosClient.delete(`watchlist/${movieData.id}`, options);
    queryClient.invalidateQueries('watchlist');
  };

  const handleClick = () => {
    if (inWatchlist) {
      removeFromWatchlist();
    } else {
      addToWatchlist();
    }
    setInWatchlist(!inWatchlist);
  };

  return (
    <button
      style={{ display: 'flex', alignItems: 'center' }}
      type="button"
      onClick={handleClick}
      className="watchlist--btn"
    >
      {inWatchlist ? (
        <img width="40px" src="../images/delete-watchlist.svg" alt="" />
      ) : (
        <img width="40px" src="../images/add-watchlist.svg" alt="" />
      )}
    </button>
  );
}
