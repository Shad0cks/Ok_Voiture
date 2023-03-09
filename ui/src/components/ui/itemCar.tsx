function ItemCar() {
  return (
    <div className="mb-5 flex flex-col sm:mb-8 sm:divide-y  ">
      <div className="py-5 sm:py-8">
        <div className="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6">
          <div className="sm:-my-2.5">
            <a
              href="/"
              className="group relative block h-40 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-56 sm:w-40"
            >
              <img
                src="data:image/jpeg;base64,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"
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
                Tesla model 3
              </a>

              <span className="block text-gray-500">Years: 2010</span>
              <span className="block text-gray-500">
                CComment décrire une voiture ? Une automobile (ou voiture) est
                un véhicule à quatre roues fonctionnant à l'aide d'un moteur (à
                essence, électrique, à gaz, etc.)
              </span>
            </div>

            <div>
              <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                Polynésie 90677
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
                $15.00 / day
              </span>
              <button className="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base mt-5">
                Rent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCar;
