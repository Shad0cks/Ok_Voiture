import Footer from "./components/ui/footer";
import ListCars from "./components/ui/listCars";
import Welcome from "./components/ui/welcome";

function App() {
  return (
    <div>
      <section>
        <Welcome />
      </section>
      <section id="listCarSec">
        <ListCars />
      </section>
      <section>
        <Footer />
      </section>
    </div>
  );
}

export default App;
