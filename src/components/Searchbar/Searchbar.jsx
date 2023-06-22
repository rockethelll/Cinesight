export default function Searchbar() {
  return (
    <div className="searchbar__wrapper">
      <form>
        <button type="button">
          <img src="../images/search.svg" height="20px" alt="search logo" />
        </button>
        <input type="search" placeholder="Search movie ..." />
        <button type="button">
          <img src="../images/filter.svg" height="18px" alt="filter logo" />
        </button>
      </form>
    </div>
  );
}
