import { BrowserRouter, Route, Routes } from "react-router-dom";
import Bilgiler from "./components/Bilgiler";
import Banks from "./pages/Banks";
import ExampleForm from "./components/ExampleForm";
import Calculate from "./pages/Calculate";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<ExampleForm />} />
          <Route path="/bilgiler" element={<Bilgiler />} />
          <Route path="/banks" element={<Banks />} />
          <Route path="/calculate" element={<Calculate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
