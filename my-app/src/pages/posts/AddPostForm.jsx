import { useState } from "react";

function AddPostForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);

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
      await onAdd({ title: cleanTitle, body: cleanBody });
      setTitle("");
      setBody("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h3>הוספת פוסט חדש</h3>

      <input
        type="text"
        placeholder="כותרת"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="תוכן הפוסט"
        rows={4}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />

      <button className="posts-select-btn" type="submit" disabled={saving}>
        {saving ? "שומר..." : "הוסף פוסט"}
      </button>
    </form>
  );
}

export default AddPostForm;
