export function setAuth(token, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  if (user && user.userId) {
    localStorage.setItem("userId", user.userId.toString());
  }
}

export function getAuth() {
  return {
    token: localStorage.getItem("token"),
    user: JSON.parse(localStorage.getItem("user")),
  };
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}