import useSnackbar from "./components/hooks/useSnakbar";
import Footer from "./components/ui/footer";
import ListCars from "./components/ui/listCars";
import TSSnackbar from "./components/ui/TSSsnakbar";
import Welcome from "./components/ui/welcome";

function App() {
  const snackbar = useSnackbar();
  return (
    <div>
      <section>
        <Welcome />
      </section>
      <section id="listCarSec">
        <ListCars snackbar={snackbar} />
      </section>
      <section>
        <Footer />
      </section>
      <TSSnackbar
        open={snackbar.open}
        setOpen={snackbar.setOpen}
        severity={snackbar.severity}
        message={snackbar.message}
      />
    </div>
  );
}

export default App;
