export function DeleteBook(bookID: string) {
  return fetch(process.env.REACT_APP_API_URL + "/" + bookID + "/book", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
