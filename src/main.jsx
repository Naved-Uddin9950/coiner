import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ROUTES } from "./routes/routes.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppProvider>
      <ROUTES />
    </AppProvider>
  </Router>
);
