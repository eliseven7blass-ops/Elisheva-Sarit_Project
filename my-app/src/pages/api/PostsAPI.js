const BASE_URL = "http://localhost:3001";

export async function getPostsByUserId(userId) {
  const res = await fetch(`${BASE_URL}/posts?userId=${userId}`);

  if (!res.ok) {
    throw new Error("לא הצלחתי להביא פוסטים מהשרת");
  }

  return res.json(); // מחזיר מערך posts
}
