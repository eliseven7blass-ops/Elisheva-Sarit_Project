import { api } from "../api/restClient"; // תתאימי נתיב אם צריך

export function getCommentsByPostId(postId) {
  return api.get(`/comments?postId=${encodeURIComponent(String(postId))}`);
}

export function createComment({ postId, username, body }) {
  return api.post(`/comments`, {
    postId: String(postId),          // חשוב: לשמור כמחרוזת
    name: `תגובה מאת ${username}`,
    email: username,                 // מזהה בעלות
    body,
  });
}

export function updateComment(commentId, updates) {
  return api.patch(`/comments/${commentId}`, updates);
}

export function deleteComment(commentId) {
  return api.del(`/comments/${commentId}`);
}
