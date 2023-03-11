import { useEffect, useState } from "react";
import AdminPanel from "./admin";
import useSnackbar from "./components/hooks/useSnakbar";
import TSSnackbar from "./components/ui/TSSsnakbar";
import { CheckPassword } from "./services/checkPassword";
import Cookies from "js-cookie";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLog, setIsLog] = useState(false);
  const snackbar = useSnackbar();

  useEffect(() => {
    //verifie si le mot de passe n'est pas deja contunue dans les cookies
    const cookiePass = Cookies.get("password");
    if (!cookiePass) return;
    CheckPassword(cookiePass)
      .then(async (res) => {
        if (res.ok) {
          res.json().then((e) => {
            if (e.res === true) setIsLog(true);
            else Cookies.remove("password");
          });
        } else {
          snackbar.setMessage("Failed to check password validity");
          snackbar.setSeverity("error");
          snackbar.setOpen(true);
        }
      })
      .catch((err) => {
        snackbar.setMessage("Failed to check password validity");
        snackbar.setSeverity("error");
        console.error(err);
        snackbar.setOpen(true);
      }); // eslint-disable-next-line
  }, []);

  function check() {
    CheckPassword(password)
      .then(async (res) => {
        if (res.ok) {
          res.json().then((e) => {
            if (e.res === true) {
              Cookies.set("password", password);
              setIsLog(true);
            } else {
              snackbar.setMessage("Wrong password");
              snackbar.setSeverity("error");
              snackbar.setOpen(true);
              setPassword("");
            }
          });
        } else {
          snackbar.setMessage("Failed to check password validity");
          snackbar.setSeverity("error");
          snackbar.setOpen(true);
        }
      })
      .catch((err) => {
        snackbar.setMessage("Failed to check password validity");
        snackbar.setSeverity("error");
        console.error(err);
        snackbar.setOpen(true);
      });
  }

  return (
    <>
      {!isLog ? (
        <section className="max-w-xl mt-12 mx-auto px-4 md:px-8">
          <div className="space-y-3 mt-24 text-center">
            <h3 className="text-3xl text-gray-800 font-bold">
              Admin Panel Login
            </h3>
          </div>
          <div className="mt-10">
            <div className="items-center justify-center sm:flex">
              <input
                onKeyDown={(event) => (event.key === "Enter" ? check() : null)}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter admin password"
                className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => check()}
                className="w-full mt-3 px-5 py-3 rounded-md text-white bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-700 duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto"
              >
                Login
              </button>
            </div>
            <p className="mt-3 mx-auto text-center max-w-lg text-[15px] text-gray-400">
              Password will be save in your cookies
            </p>
          </div>
        </section>
      ) : (
        <AdminPanel snackbar={snackbar} />
      )}
      <TSSnackbar
        open={snackbar.open}
        setOpen={snackbar.setOpen}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </>
  );
}

export default AdminLogin;
