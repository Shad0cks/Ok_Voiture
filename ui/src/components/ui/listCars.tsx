import { useEffect, useState } from "react";
import { carDTO } from "../../dtos/car.dto";
import { getCarsList } from "../../services/getAllCars";
import { SnackbarHook } from "../hooks/useSnakbar";
import ItemCar from "./itemCar";

function ListCars({ snackbar }: { snackbar: SnackbarHook }) {
  const [carsList, setCarsList] = useState<carDTO[]>();

  useEffect(() => {
    getCarsList(snackbar, setCarsList); // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Cars List
          </h2>
        </div>
        {carsList && carsList.length > 0
          ? carsList
              .sort((a, b) => (a.price < b.price ? -1 : 1))
              .map((e: carDTO, i) => <ItemCar key={i} rentCar={e} />)
          : null}
      </div>
    </div>
  );
}

export default ListCars;
