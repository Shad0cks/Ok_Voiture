import { SnackbarHook } from "../components/hooks/useSnakbar";
import { carDTO } from "../dtos/car.dto";
import { ReservedDateDTO } from "../dtos/revervedDates.dto";

export function GetAllData() {
  return fetch(process.env.REACT_APP_API_URL + "/admin", {
    method: "Get",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: "password",
    },
  });
}

export async function getAdminData(
  snackbar: SnackbarHook,
  setCarsList: React.Dispatch<
    React.SetStateAction<
      { car: carDTO; books: ReservedDateDTO[] }[] | undefined
    >
  >
) {
  GetAllData()
    .then(async (res) => {
      if (res.ok) {
        res.json().then((e) => {
          setCarsList(e);
        });
      } else {
        snackbar.setMessage("Failed to get rent list");
        snackbar.setSeverity("error");
        snackbar.setOpen(true);
      }
    })
    .catch((err) => {
      snackbar.setMessage("Failed to get rent list");
      snackbar.setSeverity("error");
      console.error(err);
      snackbar.setOpen(true);
    });
}
