import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import HomeCard from "../components/Cards/HomeCard/HomeCard";
import SearchCard from "../components/Cards/SearchCard/SearchCard";
import { useWindowSize } from "@uidotdev/usehooks";

const Home = () => {
  const screenSize = useWindowSize();
  let handleCenterSlide;
  let handleArrow;

  const images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  if (screenSize.width > 810) {
    handleCenterSlide = 25;
    handleArrow = true;
  } else if (screenSize.width > 540) {
    handleCenterSlide = 45;
  } else {
    handleCenterSlide = 65;
    handleArrow = false;
  }

  return (
    <main>
      <h2>Dernières sorties</h2>
      <Carousel
        className="main-slide"
        centerMode={true}
        centerSlidePercentage={handleCenterSlide}
        useKeyboardArrows={true}
        showStatus={false}
        showIndicators={false}
        showArrows={handleArrow}
        swipeScrollTolerance={5}
        swipeable={true}
        showThumbs={false}
        width={"100%"}
      >
        {images.map((index) => (
          <HomeCard key={index} index={index} />
        ))}
      </Carousel>

      <h2>Résultat de la recherche</h2>
      <div className="auto-grid">
        {images.map((index) => (
          <SearchCard key={index} />
        ))}
      </div>
    </main>
  );
};

export default Home;
