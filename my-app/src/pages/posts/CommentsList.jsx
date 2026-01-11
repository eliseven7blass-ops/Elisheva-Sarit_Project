import CommentItem from "./CommentItem";

function CommentsList({
  comments,
  user,
  isMine,
  editingId,
  editBody,
  setEditBody,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}) {
  if (comments.length === 0) {
    return <p className="comments-status">אין תגובות לפוסט הזה.</p>;
  }

  return (
    <ul className="comments-list">
      {comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          user={user}
          mine={isMine(c)}
          editing={String(editingId) === String(c.id)}
          editBody={editBody}
          setEditBody={setEditBody}
          onStartEdit={() => onStartEdit(c)}
          onCancelEdit={onCancelEdit}
          onSaveEdit={() => onSaveEdit(c.id)}
          onDelete={() => onDelete(c.id)}
        />
      ))}
    </ul>
  );
}

export default CommentsList;
