import { SnackbarHook } from "../components/hooks/useSnakbar";
import { ReservedDateDTO } from "../dtos/revervedDates.dto";

export function GetAllBook(carID: string) {
  return fetch(process.env.REACT_APP_API_URL + "/" + carID + "/book", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function GetReservations(
  carID: number,
  setBookList: React.Dispatch<
    React.SetStateAction<ReservedDateDTO[] | undefined>
  >,
  snackbar: SnackbarHook
) {
  GetAllBook(carID.toString())
    .then(async (res) => {
      if (res.ok) {
        res.json().then((e) => {
          console.log(e);
          setBookList(e);
        });
      } else {
        snackbar.setMessage("Error while booking the rent !");
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
