function CommentItem({
  comment,
  mine,
  editing,
  editBody,
  setEditBody,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) {
  const author = comment.email || comment.name || "לא ידוע";

  return (
    <li className="comment-item">
      <div className="comment-head">
        <span className="comment-author">
          {author} {mine ? "(שלי)" : ""}
        </span>
        <span className="comment-id">#{comment.id}</span>
      </div>

      {!editing ? (
        <p className="comment-body">{comment.body}</p>
      ) : (
        <textarea
          className="comment-edit"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
      )}

      {mine && (
        <div className="comment-actions">
          {!editing ? (
            <>
              <button type="button" onClick={onStartEdit}>
                ערוך
              </button>
              <button type="button" onClick={onDelete}>
                מחק
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={onSaveEdit}
                disabled={!editBody.trim()}
              >
                שמור
              </button>
              <button type="button" onClick={onCancelEdit}>
                ביטול
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}

export default CommentItem;
