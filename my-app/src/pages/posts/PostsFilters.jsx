function PostsFilters({ searchId, setSearchId, searchTitle, setSearchTitle }) {
  return (
    <div className="posts-filters">
      <input
        type="text"
        placeholder="חיפוש לפי id"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />

      <input
        type="text"
        placeholder="חיפוש לפי כותרת"
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    </div>
  );
}

export default PostsFilters;
