import { useEffect, useState } from "react";
import { getCommentsByPostId } from "../api/CommentsAPI";
import "./Comments.css";

function Comments({ postId, visible }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!visible || !postId) return;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getCommentsByPostId(postId);
        setComments(data);
      } catch (e) {
        setError("שגיאה בטעינת תגובות");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [postId, visible]);

  if (!visible) return null;

  return (
    <div className="comments-box">
      <h4>תגובות</h4>

      {loading && <p className="comments-status">טוען תגובות...</p>}
      {error && <p className="comments-error">{error}</p>}

      {!loading && !error && comments.length === 0 && (
        <p className="comments-status">אין תגובות לפוסט זה.</p>
      )}

      <ul className="comments-list">
        {comments.map((c) => (
          <li key={c.id} className="comments-item">
            <div className="comment-meta">
              <span className="comment-name">{c.name}</span>
              <span className="comment-email">{c.email}</span>
            </div>
            <p className="comment-body">{c.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
