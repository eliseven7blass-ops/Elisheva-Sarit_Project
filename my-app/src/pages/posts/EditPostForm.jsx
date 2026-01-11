import { useEffect, useState } from "react";

function EditPostForm({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post?.title ?? "");
  const [body, setBody] = useState(post?.body ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle(post?.title ?? "");
    setBody(post?.body ?? "");
  }, [post?.id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanTitle = title.trim();
    const cleanBody = body.trim();

    if (!cleanTitle || !cleanBody) {
      alert("יש למלא כותרת ותוכן");
      return;
    }

    try {
      setSaving(true);
      await onSave({ title: cleanTitle, body: cleanBody });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>עריכת פוסט #{post.id}</h3>

      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea rows={4} value={body} onChange={(e) => setBody(e.target.value)} />

      <div className="posts-actions">
        <button className="posts-select-btn" type="submit" disabled={saving}>
          {saving ? "שומר..." : "שמור"}
        </button>

        <button className="posts-delete-btn" type="button" onClick={onCancel}>
          ביטול
        </button>
      </div>
    </form>
  );
}

export default EditPostForm;
