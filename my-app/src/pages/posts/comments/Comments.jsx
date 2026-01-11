import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../AuthContext.jsx";
import {
  getCommentsByPostId,
  createComment,
  updateComment,
  deleteComment,
} from "../../api/CommentsAPI.js";

import AddCommentForm from "./AddCommentForm.jsx";
import CommentsList from "./CommentsList.jsx";

import "./Comments.css";

function Comments({ postId, visible }) {
  const { user } = useContext(AuthContext);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    if (!visible || !postId) return;

    async function load() {
      try {
        setLoading(true);
        setError("");
        setEditingId(null);
        setEditBody("");
        setComments([]);

        const data = await getCommentsByPostId(postId);
        setComments(data);
      } catch (e) {
        console.error(e);
        setError("שגיאה בטעינת תגובות");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [visible, postId]);

  const shownComments = useMemo(() => {
    return comments.filter((c) => String(c.postId) === String(postId));
  }, [comments, postId]);

  function isMine(comment) {
    return user && String(comment.email) === String(user.username);
  }

  async function handleAdd(body) {
    try {
      const created = await createComment({
        postId,
        username: user.username,
        body,
      });

      const fixed = {
        ...created,
        postId: String(postId),
        email: created.email || user.username,
      };

      setComments((prev) => [fixed, ...prev]);
    } catch (e) {
      console.error(e);
      alert("לא הצלחתי להוסיף תגובה");
    }
  }

  function startEdit(comment) {
    setEditingId(comment.id);
    setEditBody(comment.body || "");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditBody("");
  }

  async function saveEdit(commentId) {
    try {
      const updated = await updateComment(commentId, { body: editBody.trim() });

      setComments((prev) =>
        prev.map((c) => (String(c.id) === String(updated.id) ? updated : c))
      );

      cancelEdit();
    } catch (e) {
      console.error(e);
      alert("לא הצלחתי לעדכן תגובה");
    }
  }

  async function handleDelete(commentId) {
    const ok = confirm("למחוק את התגובה?");
    if (!ok) return;

    try {
      await deleteComment(commentId);
      setComments((prev) =>
        prev.filter((c) => String(c.id) !== String(commentId))
      );
    } catch (e) {
      console.error(e);
      alert("לא הצלחתי למחוק תגובה");
    }
  }

  if (!visible) return null;

  return (
    <div className="comments-wrap">
      <h3 className="comments-title">תגובות</h3>

      {loading && <p className="comments-status">טוען תגובות...</p>}
      {error && <p className="comments-error">{error}</p>}

      <AddCommentForm
        user={user}
        postId={postId}
        onAdd={handleAdd}
      />

      <CommentsList
        comments={shownComments}
        user={user}
        isMine={isMine}
        editingId={editingId}
        editBody={editBody}
        setEditBody={setEditBody}
        onStartEdit={startEdit}
        onCancelEdit={cancelEdit}
        onSaveEdit={saveEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Comments;
