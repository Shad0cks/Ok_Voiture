export function GetAvailable(id: string) {
  return fetch(process.env.REACT_APP_API_URL + "/" + id + "/carsAvailable", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function GetAvailableCar(
  id: number,
  setIsAvaible: React.Dispatch<React.SetStateAction<boolean>>
) {
  GetAvailable(id.toString())
    .then(async (res) => {
      if (res.ok) {
        res.json().then((e) => {
          setIsAvaible(e);
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
