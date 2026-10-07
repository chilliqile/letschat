import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Chat from "./pages/Home/components/Chat/Chat";
import RootRedirect from "./pages/Root/RootRedirect";

const routes = [
  {
    path: "/",
    element: <RootRedirect />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/chats",
    element: <Home />,
    children: [
      { index: true, element: <Chat /> },
      { path: "/chats/:username", element: <Chat /> },
    ],
  },
];

export default routes;
