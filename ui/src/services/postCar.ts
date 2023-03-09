import { SnackbarHook } from "../components/hooks/useSnakbar";
import { carDTO } from "../dtos/car.dto";

export function PostCar(newCar: carDTO) {
  return fetch(process.env.REACT_APP_API_URL + "/cars", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCar),
  });
}

export function addCar(newCar: carDTO, snackbar: SnackbarHook) {
  PostCar(newCar)
    .then(async (res) => {
      if (res.ok) {
        snackbar.setMessage("Car for rent !");
        snackbar.setSeverity("success");
      } else {
        snackbar.setMessage("Error in the publication of the offer.");
        snackbar.setSeverity("error");
      }
    })
    .catch((err) => {
      snackbar.setMessage("Error in the publication of the offer.");
      snackbar.setSeverity("error");
      console.error(err);
    });
  snackbar.setOpen(true);
}
