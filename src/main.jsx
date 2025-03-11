import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ROUTES } from "./routes/routes.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppProvider>
      <ROUTES />
      <ToastContainer />
    </AppProvider>
  </Router>
);
