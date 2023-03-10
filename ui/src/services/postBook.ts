import { SnackbarHook } from "../components/hooks/useSnakbar";
import { ReservedDateDTO } from "../dtos/revervedDates.dto";

export function PostBook(newBooking: ReservedDateDTO, carID: string) {
  return fetch(process.env.REACT_APP_API_URL + "/" + carID + "/book", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });
}

export function addReservation(
  carID: number,
  newBooking: ReservedDateDTO,
  snackbar: SnackbarHook
) {
  PostBook(newBooking, carID.toString())
    .then(async (res) => {
      if (res.ok) {
        snackbar.setMessage("Booking successfuly reserved !");
        snackbar.setSeverity("success");
        snackbar.setOpen(true);
      } else {
        snackbar.setMessage("Invalid dates !");
        snackbar.setSeverity("error");
        snackbar.setOpen(true);
      }
    })
    .catch((err) => {
      snackbar.setMessage("Error while booking the rent !");
      snackbar.setSeverity("error");
      snackbar.setOpen(true);
      console.error(err);
    });
}
