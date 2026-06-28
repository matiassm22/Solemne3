import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Catalog } from "./pages/Catalog";
import { PlantDetail } from "./pages/PlantDetail";
import { Chatbot } from "./pages/Chatbot";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "plantas", Component: Catalog },
      { path: "plantas/:id", Component: PlantDetail },
      { path: "materiales", Component: Catalog },
      { path: "materiales/:id", Component: PlantDetail },
      { path: "chatbot", Component: Chatbot },
      { path: "contacto", Component: Contact },
      { path: "login", Component: Login },
      { path: "admin", Component: AdminDashboard },
    ],
  },
]);