import { createBrowserRouter } from "react-router";
import MainLayout from "../src/Layouts/MainLayout";
import Home from "../src/pages/Home/Home"
import Register from "../src/pages/Register/Register"
import Login from "../src/pages/Login/Login";
import Cart from "../src/pages/Cart/Cart"
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children:[
      {
       index:true, // this is for default path
        element: <Home/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/cart",
        element: <Cart/>
      }
    ]
  },
]);

export default router;