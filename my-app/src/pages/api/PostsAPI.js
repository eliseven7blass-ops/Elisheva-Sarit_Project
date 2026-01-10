import { api } from "../api/restClient";

export function getPostsByUserId(userId) {
  return api.get(`/posts?userId=${userId}`);
}

export function createPost(userId, title, body) {
  return api.post(`/posts`, { userId: Number(userId), title, body });
}

export function updatePost(postId, updates) {
  return api.patch(`/posts/${postId}`, updates);
}

export function deletePost(postId) {
  return api.del(`/posts/${postId}`);
}
