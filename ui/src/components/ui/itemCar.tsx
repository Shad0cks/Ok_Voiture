import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { carDTO } from "../../dtos/car.dto";
import OwnCalendar from "./calendar";
import { SnackbarHook } from "../hooks/useSnakbar";

function ItemCar({
  rentCar,
  snackbar,
}: {
  rentCar: carDTO;
  snackbar: SnackbarHook;
}) {
  let [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div className="mb-5 flex flex-col sm:mb-8 sm:divide-y  ">
        <div className="py-5 sm:py-8">
          <div className="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6">
            <div className="sm:-my-2.5">
              <a
                href="/"
                className="group relative block h-40 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-56 sm:w-40"
              >
                <img
                  src={rentCar.carPic}
                  loading="lazy"
                  alt="car"
                  className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                />
              </a>
            </div>

            <div className="flex flex-1 flex-col justify-evenly">
              <div>
                <a
                  href="/"
                  className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                >
                  {rentCar.Model}
                </a>

                <span className="block text-gray-500">
                  Years: {rentCar.Year}
                </span>
                <span className="block text-gray-500">
                  {rentCar.description}
                </span>
              </div>

              <div>
                <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                  {rentCar.City}
                </span>

                <span className="flex items-center gap-1 text-sm text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  available now
                </span>
              </div>
            </div>

            <div className="flex w-full justify-between  pt-4 sm:w-auto sm:border-none sm:pt-0">
              <div className="ml-4 pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                <span className="block font-bold text-gray-800 md:text-lg">
                  $ {rentCar.price} / day
                </span>
                <button
                  onClick={() => setModalIsOpen(true)}
                  className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base mt-5"
                >
                  Rent
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    Planning your rent
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your rent can be cancel at any time by an administrator,
                      enjoy beautiful cars
                    </p>
                  </div>

                  <div className="mt-4">
                    <OwnCalendar
                      rentCar={rentCar}
                      snackbar={snackbar}
                      setModalIsOpen={setModalIsOpen}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ItemCar;
