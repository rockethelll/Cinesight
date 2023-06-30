
function MovieTitle({ title, release_date, runtime }) {

  return (
    <div className="movieTitle">
      <span>
        <h2>{title}</h2>
        <p className="release-year">({new Date(release_date).getFullYear()})</p>
      </span>
      <p>{new Date(release_date).toLocaleDateString()} | {runtime}</p>
    </div>
  )
}

export default MovieTitle;
