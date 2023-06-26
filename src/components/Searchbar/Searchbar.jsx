import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import axiosClient from '../../axiosClient';

function useMovie(query) {
  return useQuery({
    queryKey: ['searchMovie', query],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/movies?query=${query}`);
      return data;
    },
  });
}
export default function Searchbar() {
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  const [inputText, setInputText] = useState('');
  const {
    // eslint-disable-next-line no-unused-vars
    status,
    data,
    // eslint-disable-next-line no-unused-vars
    error,
    // eslint-disable-next-line no-unused-vars
    isFetching,
  } = useMovie(inputText);

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function removeInputText() {
    setInputText('');
    useQuery.retry();
  }

  return (
    <div className="searchbar__wrapper">
      <form>
        <button type="button">
          <img src="../images/search.svg" height="20px" alt="search logo" />
        </button>
        <input
          onChange={inputHandler}
          type="search"
          placeholder="Search movie ..."
        />
        <button type="button">
          <img
            src="../images/filter.svg"
            style={{ visibility: 'hidden' }}
            height="18px"
            alt="filter logo"
          />
        </button>
        {inputText !== '' ? (
          <ul className="list-result__wrapper">
            {status === 'success'
              ? data.results.slice(0, 5).map((result) => (
                <Link
                  // eslint-disable-next-line react/jsx-no-bind
                  onClick={removeInputText}
                  to={`/movie/${result.id}`}
                  key={result.id}
                >
                  {result.poster_path !== null ? (
                    <img
                      src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${result.poster_path}`}
                      alt={`Affiche du film ${result.title}`}
                    />
                  ) : (
                    <img
                      src="../images/image.png"
                      alt={`Aucune affiche trouver pour le film ${result.title}`}
                    />
                  )}
                  {result.title}
                </Link>
              ))
              : null}
          </ul>
        ) : null}
      </form>
    </div>
  );
}
