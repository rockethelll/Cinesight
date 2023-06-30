import { useQuery } from "react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useWindowSize } from "@uidotdev/usehooks";
import { useContext } from "react";
import HomeCard from "../components/Cards/HomeCard/HomeCard";
import axiosClient from "../axiosClient";
import { UserContext } from "../Context/UserContext";
import Hero from "../components/Hero/Hero";
import useScrollDetection from "../components/Custom/useScrollDetection";
import { useState } from "react";

function useMovieQuery(endpoint) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/movies/${endpoint}`);
      return data;
    },
  });
}

function Home() {
  useScrollDetection();
  const { user } = useContext(UserContext);
  const [swipeable, setSwipeable] = useState("actived");

  const endpoints = [
    { key: "now_playing", title: "Dernières sorties" },
    { key: "upcoming", title: "À venir" },
    { key: "top_rated", title: "Mieux notés" },
    { key: "popular", title: "Populaire" },
  ];

  const queries = endpoints.map((endpoint) => ({
    query: useMovieQuery(endpoint.key),
    title: endpoint.title,
  }));
  const isVerticalScroll = useScrollDetection();

  const handleScroll = () => {
    if (isVerticalScroll) {
      console.log(isVerticalScroll);
      setSwipeable("desactived");
    } else {
      setTimeout(() => {
        setSwipeable("actived");
      }, 500);
    }
  };

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

  const isLoading = queries.some((query) => query.query.status === "loading");
  const isError = queries.some((query) => query.query.status === "error");
  const errorMessages = queries.map((query) => query.query.error?.message);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (isError) {
    return (
      <p>
        Error:
        {errorMessages.filter((msg) => msg).join(", ")}
      </p>
    );
  }

  return (
    <>
      {user === null && <Hero />}
      <div className="home" onTouchMove={handleScroll}>
        <main>
          {queries.map((query) => (
            <div
              style={{ marginBottom: "3vw" }}
              key={query.title}
              onTouchMove={handleScroll}
            >
              <h2>{query.title}</h2>
              <Carousel
                className={swipeable}
                centerMode
                centerSlidePercentage={handleCenterSlide}
                useKeyboardArrows
                showStatus={false}
                showIndicators={false}
                showArrows={handleArrow}
                swipeScrollTolerance={100}
                swipeable
                showThumbs={false}
                width="100%"
              >
                {query.query.data?.results.map((movie) => (
                  <HomeCard key={movie.id} movie={movie} />
                ))}
              </Carousel>
            </div>
          ))}
        </main>
      </div>
    </>
  );
}

export default Home;
