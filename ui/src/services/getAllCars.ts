import { SnackbarHook } from "../components/hooks/useSnakbar";
import { carDTO } from "../dtos/car.dto";

export function GetAllCars() {
  return fetch(process.env.REACT_APP_API_URL + "/cars", {
    method: "Get",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getCarsList(
  snackbar: SnackbarHook,
  setCarsList: React.Dispatch<React.SetStateAction<carDTO[] | undefined>>
) {
  GetAllCars()
    .then(async (res) => {
      if (res.ok) {
        res.json().then((e) => {
          console.log(e);
          setCarsList(e);
        });
      } else {
        snackbar.setMessage("Failed to get rent cars list");
        snackbar.setSeverity("error");
        snackbar.setOpen(true);
      }
    })
    .catch((err) => {
      snackbar.setMessage("Failed to get rent cars list");
      snackbar.setSeverity("error");
      console.error(err);
      snackbar.setOpen(true);
    });
}
