import "./App.css";
import ProductApp from "./ClassBaseProjectFolder/ProductApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <ProductApp />
    </div>
  );
}

export default App;
