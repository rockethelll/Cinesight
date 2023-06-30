function MovieTitle({ title, releaseDate, runtime }) {
  return (
    <div className="movieTitle">
      <span>
        <h2>{title}</h2>
        <p className="release-year">
          (
          {new Date(releaseDate).getFullYear()}
          )
        </p>
      </span>
      <p>
        {new Date(releaseDate).toLocaleDateString()}
        {' '}
        |
        {' '}
        {runtime}
        {' '}
        mn
      </p>
    </div>
  );
}

export default MovieTitle;
