import { useState } from "react";

function AddCommentForm({ user, postId, onAdd }) {
  const [newBody, setNewBody] = useState("");

  const canWrite = Boolean(user && postId);

  async function handleSubmit(e) {
    e.preventDefault();
    const body = newBody.trim();
    if (!body) return;

    await onAdd(body);
    setNewBody("");
  }

  return (
    <form className="comments-add" onSubmit={handleSubmit}>
      <textarea
        placeholder={canWrite ? "כתוב תגובה..." : "התחבר כדי לכתוב תגובה"}
        value={newBody}
        onChange={(e) => setNewBody(e.target.value)}
        disabled={!canWrite}
      />
      <button type="submit" disabled={!canWrite || !newBody.trim()}>
        הוסף תגובה
      </button>
    </form>
  );
}

export default AddCommentForm;
