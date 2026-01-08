export async function getUserById(userId) {
  const res = await fetch(`http://localhost:3001/users/${userId}`);

  if (!res.ok) {
    throw new Error("לא הצלחתי להביא מידע על המשתמש מהשרת");
  }

  return res.json(); // מחזיר אובייקט משתמש אחד
}
