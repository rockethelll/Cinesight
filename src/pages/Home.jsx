import { useQuery } from "react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContext } from "react";
import HomeCard from "../components/Cards/HomeCard/HomeCard";
import axiosClient from "../axiosClient";
import Watchlist from "../components/Watchlist/Watchlist";
import { UserContext } from "../Context/UserContext";
import Hero from "../components/Hero/Hero";

function useMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/");
      return data;
    },
  });
}

function Home() {
  const { user } = useContext(UserContext);

  const { status, data, error } = useMovies();

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
  if (status === "loading") {
    return <p>Loading ...</p>;
  }

  if (status === "error") {
    return (
      <p>
        Error:
        {error.message}
      </p>
    );
  }

  return (
    <>
      {user === null && <Hero />}
      <div className="home">
        <main>
          <div style={{ marginBottom: "3vw" }}>
            <h2>Dernières sorties</h2>
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
              {data?.results.map((movie) => (
                <HomeCard key={movie.id} movie={movie} />
              ))}
            </Carousel>
          </div>
          <div style={{ marginBottom: "3vw" }}>
            <h2>Dernières sorties</h2>
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
              {data?.results.map((movie) => (
                <HomeCard key={movie.id} movie={movie} />
              ))}
            </Carousel>
          </div>
          {user !== null ? (
            <Watchlist />
          ) : (
            <p>Connectez vous pour voir votre watchlist</p>
          )}
        </main>
      </div>
    </>
  );
}

export default Home;
