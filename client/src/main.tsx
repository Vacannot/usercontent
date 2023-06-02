import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import { PostProvider } from "./contexts/PostContext";
import { UserProvider } from "./contexts/UserContext";
import "./main.css";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import { LoginUser } from "./pages/LoginUser";
import RegisterUser from "./pages/RegisterUser";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<LoginUser />} />
      <Route path="/register" element={<RegisterUser />} />
      <Route path="/admin" element={<AdminPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <UserProvider>
        <PostProvider>
          <RouterProvider router={router} />
        </PostProvider>
      </UserProvider>
    </MantineProvider>
  </React.StrictMode>
);
