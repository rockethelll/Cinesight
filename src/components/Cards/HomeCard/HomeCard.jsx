import './HomeCard.scss';

export default function HomeCard({ data }) {
  console.log(data.poster_path);
  return (
    <div className="home_page__wrapper">
      <img src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`} alt="" />
    </div>
  );
}
