import EditPostForm from "./EditPostForm";
import Comments from "./Comments";

function PostDetails({
  selectedPost,
  detailsRef,
  commentsRef,
  showComments,
  toggleComments,
  isEditing,
  setIsEditing,
  onDelete,
  onSave,
}) {
  return (
    <div ref={detailsRef} className="post-details">
      {!selectedPost ? (
        <p className="posts-status">בחר פוסט כדי לראות את התוכן שלו.</p>
      ) : (
        <>
          <h3>פוסט נבחר: #{selectedPost.id}</h3>

          {!isEditing ? (
            <>
              <p className="post-details-title">{selectedPost.title}</p>
              <p className="post-details-body">{selectedPost.body}</p>

              <div className="posts-actions">
                <button
                  className="posts-select-btn"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  ערוך
                </button>

                <button
                  className="posts-delete-btn"
                  onClick={() => onDelete(selectedPost.id)}
                >
                  מחק
                </button>

                <button className="posts-select-btn" onClick={toggleComments}>
                  {showComments ? "הסתר תגובות" : "הצג תגובות"}
                </button>
              </div>
            </>
          ) : (
            <EditPostForm
              post={selectedPost}
              onSave={onSave}
              onCancel={() => setIsEditing(false)}
            />
          )}

          {/* אזור תגובות */}
          {showComments && (
            <div ref={commentsRef}>
              <Comments postId={selectedPost.id} visible={true} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default PostDetails;
