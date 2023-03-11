import { useEffect, useState } from "react";
import { carDTO } from "../../dtos/car.dto";
import { getCarsList } from "../../services/getAllCars";
import { SnackbarHook } from "../hooks/useSnakbar";
import ItemCar from "./itemCar";

function ListCars({ snackbar }: { snackbar: SnackbarHook }) {
  const [carsList, setCarsList] = useState<carDTO[]>();
  const [carsNb, setCarsNb] = useState<number>(5);

  useEffect(() => {
    getCarsList(snackbar, setCarsList); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-lg px-4 md:px-8">
          <div className="mb-6 sm:mb-10 lg:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Available cars
            </h2>
          </div>
          {
            // liste les voitures en location
            carsList && carsList.length > 0
              ? carsList
                  .sort((a, b) => (a.price < b.price ? -1 : 1))
                  .slice(0, carsNb)
                  .map((e: carDTO, i) => (
                    <ItemCar snackbar={snackbar} key={i} rentCar={e} />
                  ))
              : null
          }
        </div>
      </div>
      {carsList && carsNb >= carsList?.length ? null : (
        <div className="w-full flex justify-center">
          <button
            onClick={() => setCarsNb((prev) => prev + 5)}
            className="my-auto  rounded-full bg-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base"
          >
            see more
          </button>
        </div>
      )}
    </>
  );
}

export default ListCars;
