const BASE_URL = "http://localhost:3001";

export async function getCommentsByPostId(postId) {
  const res = await fetch(`${BASE_URL}/comments?postId=${postId}`);

  if (!res.ok) {
    throw new Error("לא הצלחתי להביא תגובות מהשרת");
  }

  return res.json(); // מערך תגובות
}
