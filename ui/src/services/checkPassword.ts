export function CheckPassword(password: string) {
  return fetch(process.env.REACT_APP_API_URL + "/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  });
}
