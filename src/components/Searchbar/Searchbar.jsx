import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
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
  const ref = useRef(null);
  const [click, setClick] = useState(true);
  const [inputText, setInputText] = useState('');
  const {
    status,
    data,
  } = useMovie(inputText);

  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setClick(true);
    setInputText(lowerCase);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [click]);

  function removeInputText() {
    setInputText('');
    useQuery.retry();
  }

  return (
    <div className="searchbar__wrapper">
      <form>
        <button type="button" aria-label="filter button">
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
        {inputText !== '' && click ? (
          <ul className="list-result__wrapper">
            {status === 'success'
              ? data.results.slice(0, 5).map((result) => (
                <Link
                    // eslint-disable-next-line react/jsx-no-bind
                  onClick={removeInputText}
                  to={`/movie/${result.id}`}
                  key={result.id}
                  ref={ref}
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
