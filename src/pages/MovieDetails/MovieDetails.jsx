import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Carousel } from 'react-responsive-carousel';
import { useWindowSize } from '@uidotdev/usehooks';
import axiosClient from '../../axiosClient';
import WatchlistButton from '../../components/Watchlist/WatchlistButton';
import Tags from '../../components/Tags/Tags';
import MovieTitle from '../../components/MovieTitle/MovieTitle';
import { UserContext } from '../../Context/UserContext';
import HomeCard from '../../components/Cards/HomeCard/HomeCard';

function useMovie(id) {
  return useQuery(['movie', id], async () => {
    const { data } = await axiosClient.get(`/movie/${id}`);
    return data;
  });
}
function useSimilar(id) {
  return useQuery({
    queryKey: ['similar', id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/movie/${id}/similar`);
      return data;
    },
  });
}

export default function MovieDetails() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const movieQuery = useMovie(id);
  const {
    status: movieStatus,
    data: movieData,
    error: movieError,
  } = movieQuery;
  const { data: similarData } = useSimilar(id);

  const screenSize = useWindowSize();
  let handleCenterSlide;
  let handleArrow;

  if (screenSize.width > 810) {
    handleCenterSlide = 25;
    handleArrow = true;
  } else if (screenSize.width > 540) {
    handleCenterSlide = 45;
  } else {
    handleCenterSlide = 65;
    handleArrow = false;
  }

  useEffect(() => {
    if (movieStatus === 'success') {
      document.title = `${movieData.title} - Movie Details`;
      return () => {
        document.title = 'Movie Details';
      };
    }
    return undefined;
  }, [movieStatus, movieData]);

  if (movieStatus === 'loading') {
    return <p>Loading ...</p>;
  }

  if (movieStatus === 'error') {
    return (
      <p>
        Error:
        {movieError.message}
      </p>
    );
  }

  return (
    <>
      <div className="movie_details__wrapper">
        <div className="movie_details__header">
          <div className="tags_details__wrapper">
            <Tags movie={movieData} />
          </div>
          <img
            src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movieData.poster_path}`}
            alt={`Poster du film ${movieData.title}`}
          />
        </div>
        <div className="movie_details__body">
          <div className="movie_details--note--like">
            <div className="movie_details--note">
              <img src="../images/tmdb-logo.svg" alt="" />
              <p>
                {movieData.vote_average.toFixed(1)}
                /10
              </p>
            </div>
            {user !== null ? <WatchlistButton movieData={movieData} /> : null}
          </div>
          <MovieTitle
            title={movieData.title}
            releaseDate={movieData.release_date}
            runtime={movieData.runtime}
          />
          {movieData.tagline.length !== 0 && (
            <p className="tagline">{movieData.tagline}</p>
          )}
          <div className="movie_details--overview">
            <p>{movieData.overview}</p>
          </div>
          <div className="movie_details--director">
            <p>
              Réalisé par
              {'  '}
              <strong>{movieData.director}</strong>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="container similar">
        <h2>Films similaires</h2>
        <Carousel
          className="main-slide"
          centerMode
          centerSlidePercentage={handleCenterSlide}
          useKeyboardArrows
          showStatus={false}
          showIndicators={false}
          showArrows={handleArrow}
          swipeScrollTolerance={5}
          swipeable
          showThumbs={false}
          width="100%"
        >
          {similarData?.results.map((similarMovie) => (
            <HomeCard key={similarData.id} movie={similarMovie} />
          ))}
        </Carousel>
      </div>
    </>
  );
}
