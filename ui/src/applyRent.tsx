import Header from "./components/ui/header";
import { useForm, SubmitHandler } from "react-hook-form";
import { carDTO } from "./dtos/car.dto";
import { addCar } from "./services/postCar";
import { BlobServiceClient } from "@azure/storage-blob";
import { useState } from "react";
import TSSnackbar from "./components/ui/TSSsnakbar";
import useSnackbar from "./components/hooks/useSnakbar";

function ApplyRent() {
  let url: string | undefined = undefined;
  const snackbar = useSnackbar();

  const { register, reset, handleSubmit } = useForm<carDTO>();
  const [image, setImage] = useState<File>();
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length === 1)
      setImage(event.target.files[0]);
  };

  const onSubmit: SubmitHandler<carDTO> = async (data: carDTO) => {
    const isImage = checkImage(image);
    if (isImage) await updateImg(image);
    if (url && isImage) {
      data.carPic = url;
      console.log(data);
      addCar(data, snackbar);
      reset();
    } else {
      snackbar.setMessage("Image uploading failed");
      snackbar.setSeverity("error");
      snackbar.setOpen(true);
    }
  };

  // Vérifier si le fichier est une image
  function checkImage(pic: File | undefined) {
    if (pic === undefined || pic.type.split("/")[0] !== "image") return false;
    return true;
  }

  function updateImg(pic: File | undefined) {
    if (pic === undefined) return;
    const account = process.env.REACT_APP_AZURE_ACCOUNT_NAME;
    const sas = process.env.REACT_APP_SAS_TOKEN;
    const time = Date.now();

    const fileExt = pic.name.substring(pic.name.lastIndexOf("."));
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onerror = reject;
      img.onload = async () => {
        const newFile = new File([pic], time + fileExt);
        const blobServiceClient = new BlobServiceClient(
          `https://${account}.blob.core.windows.net/?${sas}`
        );
        const containerClient =
          blobServiceClient.getContainerClient("carspics");
        const blobClient = containerClient.getBlockBlobClient(newFile.name);
        await blobClient.uploadData(newFile);
        url = `https://okvoiture.blob.core.windows.net/ok-voiture/${time}${fileExt}`;
        resolve(img);
      };
      img.src = URL.createObjectURL(pic);
    });
  }

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

        <form
          className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              First name*
            </label>
            <input
              id="name"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              {...register("name")}
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Email*
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              name="email"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
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
              id="Model"
              {...register("Model")}
              name="Model"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
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
              {...register("Year")}
              id="Year"
              type="number"
              placeholder="YYYY"
              min="2017"
              max="2100"
              name="Year"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
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
              id="City"
              {...register("City")}
              name="City"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
            />
          </div>

          <div>
            <label
              htmlFor="start"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Start date*
            </label>
            <input
              id="start"
              {...register("start")}
              type="date"
              name="start"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
            />
          </div>

          <div>
            <label
              htmlFor="end"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              End date*
            </label>
            <input
              {...register("end")}
              id="end"
              type="date"
              name="end"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Description*
            </label>
            <textarea
              id="description"
              {...register("description")}
              name="description"
              className="h-64 w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
            />
          </div>

          <div>
            <label
              htmlFor="carPic"
              className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Car picture*
            </label>
            <input
              onChange={handleImageChange}
              id="carPic"
              name="carPic"
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
              id="price"
              {...register("price")}
              placeholder="50 euros"
              min="1"
              max="10000"
              type="number"
              name="price"
              className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              required
            />
          </div>

          <div className="flex items-center justify-between sm:col-span-2">
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
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
      <TSSnackbar
        open={snackbar.open}
        setOpen={snackbar.setOpen}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </div>
  );
}

export default ApplyRent;
