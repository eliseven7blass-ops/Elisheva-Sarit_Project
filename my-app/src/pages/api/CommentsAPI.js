// api/CommentsAPI.js
import { api } from "./restClient";

export function getCommentsByPostId(postId) {
  return api.get(`/comments?postId=${postId}`);
}
