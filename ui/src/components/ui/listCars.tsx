import ItemCar from "./itemCar";

function ListCars() {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Cars List
          </h2>
        </div>
        <ItemCar />
        <ItemCar />
        <ItemCar />
        <ItemCar />
      </div>
    </div>
  );
}

export default ListCars;
