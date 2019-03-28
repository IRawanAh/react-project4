export function setUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function setJwtCookie(token) {
  document.cookie = `jwt=${token}`;
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user === "undefined" ? null : JSON.parse(user);
}

export function Signout() {
  document.cookie = "jwt= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  localStorage.removeItem("user");
}
