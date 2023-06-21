import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useWindowSize } from '@uidotdev/usehooks';
import HomeCard from '../components/Cards/HomeCard/HomeCard';
import SearchCard from '../components/Cards/SearchCard/SearchCard';
import axiosClient from '../axiosClient';

function Home() {
  const [data, setData] = useState();
  const screenSize = useWindowSize();
  let handleCenterSlide;
  let handleArrow;

  useEffect(() => {
    const response = axiosClient.get('/');
    response.then((responseData) => setData(responseData));
  }, []);

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
        {
        data !== undefined ? (
          data.data.results.map((movie) => (
            <HomeCard key={movie.id} data={movie} />
          ))
        ) : (
          console.log('prout')
        )
        }
        ;
      </Carousel>
      {
        data !== undefined ? (
          data.data.results.map((movie) => (
            <div className="auto-grid">
              <SearchCard key={movie.id} data={movie} />
            </div>
          ))
        ) : (
          console.log('prout')
        )
      }
    </main>
  );
}

export default Home;
