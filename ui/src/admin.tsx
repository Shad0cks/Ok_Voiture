import moment from "moment";
import { useEffect, useState } from "react";
import { SnackbarHook } from "./components/hooks/useSnakbar";
import Header from "./components/ui/header";
import { carDTO } from "./dtos/car.dto";
import { ReservedDateDTO } from "./dtos/revervedDates.dto";
import { DeleteBook } from "./services/deleteBook";
import { getAdminData } from "./services/getAllData";

function AdminPanel({ snackbar }: { snackbar: SnackbarHook }) {
  const [rentList, setRentList] =
    useState<{ car: carDTO; books: ReservedDateDTO[] }[]>();
  const [searchBar, setSearchBar] = useState<string>("");

  useEffect(() => {
    getAdminData(snackbar, setRentList); // eslint-disable-next-line
  }, []);

  //applique le filtre de la barre de recherche
  const filter = (car: carDTO, book: ReservedDateDTO) => {
    const sep = searchBar.indexOf(":");
    const emailFilter =
      sep === -1 ? searchBar : searchBar.substring(0, searchBar.indexOf(":"));
    const model =
      sep === -1 ? "" : searchBar.substring(searchBar.indexOf(":") + 1);

    if (model.length > 0)
      return car.Model.startsWith(model) && car.email.startsWith(emailFilter);

    return car.email.startsWith(emailFilter);
  };

  // annule la reservation
  const cancelRent = (
    elem: { car: carDTO; books: ReservedDateDTO[] },
    book: ReservedDateDTO
  ) => {
    if (!rentList) return;

    DeleteBook(book.id!.toString())
      .then(async (res) => {
        if (res.ok) {
          const newList = elem.books.filter(
            (element) => book.id !== element.id
          );

          const newObjList = rentList.map((e) =>
            e.car.id === elem.car.id ? { ...e, books: newList } : e
          );
          setRentList(newObjList);

          snackbar.setMessage("Reservation succesfuly cancel !");
          snackbar.setSeverity("success");
          snackbar.setOpen(true);
        } else {
          snackbar.setMessage("Error when cancelling rent !");
          snackbar.setSeverity("error");
          snackbar.setOpen(true);
        }
      })
      .catch((err) => {
        snackbar.setMessage("Error when cancelling rent !");
        snackbar.setSeverity("error");
        snackbar.setOpen(true);
        console.error(err);
      });
  };

  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <Header />
        <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-10">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
              Reservation list
            </h3>
          </div>
          <div className="flex flex-col mt-10">
            <div className="flex justify-between py-3 pl-2">
              <div className="relative max-w-xs  w-full">
                <input
                  onChange={(e) => setSearchBar(e.target.value)}
                  value={searchBar}
                  type="text"
                  name="hs-table-search"
                  id="hs-table-search"
                  className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-100 dark:border-gray-200 dark:text-gray-400"
                  placeholder="email:car"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <svg
                    className="h-3.5 w-3.5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto border rounded-lg">
              <div className="p-1.5 w-full inline-block align-middle">
                <div className="">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          renter Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                        >
                          renter Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Car Model
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          rental interval
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                        >
                          Cancel
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rentList
                        ? rentList.map((e) =>
                            e.books.map((book) =>
                              filter(e.car, book) ? (
                                <tr key={book.id}>
                                  <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    {book.id}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                    {e.car.name}
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                    <p
                                      className="hover:text-green-700 cursor-pointer"
                                      onClick={() =>
                                        setSearchBar(e.car.email + ":")
                                      }
                                    >
                                      {e.car.email}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    <p
                                      className="text-green-500 hover:text-green-700 cursor-pointer"
                                      onClick={() =>
                                        setSearchBar(
                                          e.car.email + ":" + e.car.Model
                                        )
                                      }
                                    >
                                      {e.car.Model}
                                    </p>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-800 text-right whitespace-nowrap">
                                    {moment(book.start).format("DD-MM-YYYY")} /{" "}
                                    {moment(book.end).format("DD-MM-YYYY")}
                                  </td>
                                  <td className="px-6 py-4 flex justify-end whitespace-nowrap">
                                    <svg
                                      onClick={() => cancelRent(e, book)}
                                      className="cursor-pointer	"
                                      height="20px"
                                      fill="red"
                                      id="Layer_1"
                                      version="1.1"
                                      viewBox="0 0 512 512"
                                      width="20px"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                                    </svg>
                                  </td>
                                </tr>
                              ) : null
                            )
                          )
                        : null}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
