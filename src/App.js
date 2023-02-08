import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoggedOut from "./pages/LoggedOut/LoggedOut";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoggedOut />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
