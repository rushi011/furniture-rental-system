import axios from "../api/axios";
import { getAuth } from "../utils/auth";

export async function addFavorite(furnitureItemId) {
  const { user } = getAuth();
  if (!user || !user.userId) throw new Error("User not logged in");
  return axios.post(`/api/favorites/add?userId=${user.userId}&furnitureItemId=${furnitureItemId}`);
}
