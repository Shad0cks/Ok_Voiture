import Header from "./components/ui/header";

function ApplyRent() {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <Header />
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Rent your car
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            A convenient and reliable way to earn extra money by renting out
            your car
          </p>
        </div>

        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              First name*
            </label>
            <input
              name="first-name"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="Email"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Email*
            </label>
            <input
              type="email"
              name="Email"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="Model"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Model*
            </label>
            <input
              name="Model"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="Year"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Year*
            </label>
            <input
              type="number"
              placeholder="YYYY"
              min="2017"
              max="2100"
              name="Year"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="City"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              City*
            </label>
            <input
              name="City"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Stat date*
            </label>
            <input
              type="date"
              name="start-date"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="end-date"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              End date*
            </label>
            <input
              type="date"
              name="end-date"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Description*
            </label>
            <textarea
              name="message"
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Car picture*
            </label>
            <input
              name="image"
              type="file"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Price / day*
            </label>
            <input
              placeholder="50 euros"
              min="1"
              max="10000"
              type="number"
              name="price"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
              Rent
            </button>
            <span className="text-sm text-gray-500">*Required</span>
          </div>

          <p className="text-xs text-gray-400">
            By renting your car you agree to our{" "}
            <a
              href="/"
              className="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
            >
              Privacy Policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
}

export default ApplyRent;
