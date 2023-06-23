import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import axiosClient from "../../axiosClient";
import { useEffect } from "react";

function useMovie(query) {
  return useQuery({
    queryKey: ["searchMovie", query],
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
    error,
    isFetching,
  } = useMovie(inputText);

  useEffect(() => {
  })
  const inputHandler = (e) => {
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function removeInputText() {
    setInputText('');
    useQuery.retry();
    queryClient.invalidateQueries('searchMovie');
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
          <img src="../images/filter.svg" style={{visibility:'hidden'}} height="18px" alt="filter logo" />
        </button>
        <ul className="list-result__wrapper">
          {status === "success"
            ? data.results.slice(0, 5).map((result) => (
              <Link onClick={removeInputText} to={`/movie/${result.id}`} key={result.id}>
                {result.title}
                &nbsp;
                (
                {result.release_date}
                )
              </Link>
            ))
            : null}
        </ul>
      </form>
    </div>
  );
}
