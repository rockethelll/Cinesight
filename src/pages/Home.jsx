import { useQuery, useQueryClient } from "react-query";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useWindowSize } from "@uidotdev/usehooks";
import HomeCard from "../components/Cards/HomeCard/HomeCard";
import axiosClient from "../axiosClient";
import Watchlist from "../components/Watchlist/Watchlist";

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
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();
  // eslint-disable-next-line no-unused-vars
  const { status, data, error, isFetching } = useMovies();

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

      <Watchlist />
    </main>
  );
}

export default Home;
