
function MovieTitle({ title, release_date }) {

  return (
    <div className="movieTitle">
      <span>
        <h2>{title}</h2>
        <p className="release-year">({new Date(release_date).getFullYear()})</p>
      </span>
    </div>
  )
}

export default MovieTitle;
