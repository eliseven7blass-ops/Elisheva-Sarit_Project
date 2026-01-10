function PostsList({ posts, selectedPostId, onSelect }) {
  if (posts.length === 0) {
    return <p className="posts-status">לא נמצאו פוסטים.</p>;
  }

  return (
    <ul className="posts-list">
      {posts.map((post) => {
        const isSelected = String(post.id) === String(selectedPostId);

        return (
          <li
            key={post.id}
            className={`posts-item ${isSelected ? "selected" : ""}`}
          >
            <div className="posts-left">
              <span className="posts-id">#{post.id}</span>
              <span className="posts-title">{post.title}</span>
            </div>

            <button
              className="posts-select-btn"
              onClick={() => onSelect(post.id)}
            >
              {isSelected ? "נבחר" : "בחר"}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default PostsList;
