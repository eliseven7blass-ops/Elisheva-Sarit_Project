import Comments from "./Comments";

function PostDetails({
  selectedPost,
  detailsRef,
  commentsRef,
  showComments,
  toggleComments
}) {
  return (
    <>
      <div ref={detailsRef} className="post-details">
        {!selectedPost ? (
          <p className="posts-status">בחר פוסט כדי לראות את התוכן שלו.</p>
        ) : (
          <>
            <h3>פוסט נבחר: #{selectedPost.id}</h3>
            <p className="post-details-title">{selectedPost.title}</p>
            <p className="post-details-body">{selectedPost.body}</p>
          </>
        )}
      </div>

      {selectedPost && (
        <div ref={commentsRef}>
          <button className="posts-select-btn" onClick={toggleComments}>
            {showComments ? "הסתר תגובות" : "הצג תגובות"}
          </button>

          <Comments postId={selectedPost.id} visible={showComments} />
        </div>
      )}
    </>
  );
}

export default PostDetails;
