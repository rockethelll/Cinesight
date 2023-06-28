import { useQuery, useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import axiosClient from '../../axiosClient';
import SearchCard from '../Cards/SearchCard/SearchCard';

function useWatchlist() {
  return useQuery({
    queryKey: ['watchlist'],
    queryFn: async () => {
      const { data } = await axiosClient.get('/watchlist', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      });
      return data;
    },
  });
}

export default function Watchlist() {
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  const {
    // eslint-disable-next-line no-unused-vars
    status,
    data,
    // eslint-disable-next-line no-unused-vars
    error,
    // eslint-disable-next-line no-unused-vars
    isFetching,
  } = useWatchlist();

  return (
    <>
      <h1>Watchlist</h1>
      <div className="reel">
        {status === 'success'
          && data.length > 0
          && data.map((watchlistMovie) => (
            <SearchCard key={watchlistMovie.id} data={watchlistMovie} />
          ))}
        {status === 'success' && data.length === 0 && (
          <p>Votre watchlist est vide</p>
        )}
        {status === 'loading' && <p>Loading</p>}
      </div>
    </>
  );
}
