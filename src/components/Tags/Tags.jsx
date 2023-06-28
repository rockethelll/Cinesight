export default function Tags({ tags }) {
  return (
    <>
      {tags.slice(0, 2).map((genre) => (
        <div key={genre.id} className="tag__wrapper">
          <div className="tag">{genre.name}</div>
        </div>
      ))}
    </>
  );
}
