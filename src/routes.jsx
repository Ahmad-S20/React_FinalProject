import { createBrowserRouter } from "react-router";
import MainLayout from "../src/Layouts/MainLayout";
import Home from "../src/pages/Home/Home"
import Register from "../src/pages/Register/Register"
import Login from "../src/pages/Login/Login";
import Cart from "../src/pages/Cart/Cart"
import ProductsDetails from "./components/Products/ProductsDetails";
import ProtectedRouter from "./components/Protected/ProtectedRouter";
// import CheckOut from "./pages/CheckOut/CheckOut";
import Profile from "./pages/Profile/Profile";
import Order from "./pages/Profile/Order";
import Info from "./pages/Profile/Info";
import { patch } from "@mui/material";
import ProductsFilter from "./pages/Products/ProductsFilter";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
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
        element: 
        <ProtectedRouter>
          <Cart/>
        </ProtectedRouter>
      },
      // {
      //   path:"/checkout",
      //   element: 
      //   <ProtectedRouter>
      //     <CheckOut/>
      //   </ProtectedRouter>
      // },
       {
        path:"/profile",
        element: 
        <ProtectedRouter>
          <Profile/>
        </ProtectedRouter>,
        children:[
          {
            path:"info",
            element:<Info/>
          },
         {
          path:"orders",
          element:<Order/>
         }
        ]
        
      },
      {
        path:"/product/:id",
        element: <ProductsDetails/>
      },
     {
       path:"shop",
      element:<ProductsFilter/>
     },
     {
      path:"forgot-password",
      element:<ForgotPassword/>
     },
    ]
  },
]);

export default router;