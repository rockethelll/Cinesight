export default function SearchCard({ data }) {
  return (
    <div className="search_card__wrapper">
      <div className="search_card--img">
        <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`} alt={data.original_title} />
      </div>
      <div className="search_card__header">
        <h3>Joker</h3>
        <p>2019 - 1h56</p>
      </div>
      <div className="search_card__body">
        <div className="tmdb-notes">
          <img src="../images/tmdb-logo.svg" alt="tmdb logo" />
          <p>8.2/10</p>
        </div>
      </div>
    </div>
  );
}
