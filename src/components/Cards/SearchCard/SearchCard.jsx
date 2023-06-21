import './SearchCard.scss';

export default function SearchCard({ data }) {
  return (
    <div className="search_card__wrapper">
      <div className="search_card--img">
        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`} alt="" />
      </div>
      <div className="search_card__header">
        <h3>Joker</h3>
        <p>2019 - 1h56</p>
      </div>
      <div className="search_card__body">
        <div className="tags">
          <div className="tag">
            <p>AVENTURE</p>
          </div>
          <div className="tag">
            <p>ACTION</p>
          </div>
        </div>
        <div className="tmdb-notes">
          <img src="../images/tmdb-logo.svg" alt="" />
          <p>8.2/10</p>
        </div>
      </div>
      <div className="search_card__footer">
        <div className="watch-providers">
          <img src="../images/playstore.svg" alt="" />
          <img src="../images/apple.svg" alt="" />
          <img src="../images/amazon.svg" alt="" />
          <img src="../images/youtube.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
