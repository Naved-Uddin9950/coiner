import { publicRoutes } from "./publicRoutes";
import { Routes, Route } from "react-router-dom";
import App from "../App";

export const ROUTES = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Route>
    </Routes>
  );
};
