import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Vagas from "../pages/vagas/page";
import Login from "../pages/login/page";
import Cadastro from "../pages/cadastro/page";
import Perfil from "../pages/perfil/page";
import Dashboard from "../pages/dashboard/page";
import ComoFunciona from "../pages/como-funciona/page";
import Sobre from "../pages/sobre/page";
import Notificacoes from "../pages/notificacoes/page";
import Empresa from "../pages/empresa/page";
import Empresas from "../pages/empresas/page";
import Candidatura from "../pages/candidatura/page";
import RequireAuth from "../components/feature/RequireAuth";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/vagas",
    element: <Vagas />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/perfil",
    element: <Perfil />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/como-funciona",
    element: <ComoFunciona />,
  },
  {
    path: "/sobre",
    element: <Sobre />,
  },
  {
    path: "/notificacoes",
    element: <Notificacoes />,
  },
  {
    path: "/empresas",
    element: <Empresas />,
  },
  {
    path: "/empresa/:id",
    element: <Empresa />,
  },
  {
    path: "/candidatura/:vagaId",
    element: <RequireAuth><Candidatura /></RequireAuth>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
