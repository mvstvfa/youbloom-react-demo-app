const BASE = "https://jsonplaceholder.typicode.com";

async function request(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export function getUsers() {
  return request("/users");
}

export function getUser(id) {
  return request(`/users/${id}`);
}