import { useEffect } from 'react';
import './App.css';
import Protected from './features/auth/components/Protected';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import SignupPage from './pages/SignupPage';
import PageNotFound from './pages/404';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import UserProfilePage from './pages/UserProfilePage';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import Footer from './features/common/Footer';
import { ProductList } from './features/product-list/components/ProductList';
import Chatbot from './features/chatbot/Chatbot';

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};

const router = createBrowserRouter([
  {
    path: "/",
    element:<Home></Home>
  },
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <Loginpage></Loginpage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected><CartPage></CartPage> </Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><Checkout></Checkout></Protected>,
  },
  {
    path: "/product-grid",
    element: <ProductList></ProductList>,
  },
  {
    path: "/product-details/:id",
    element: <ProductDetailsPage></ProductDetailsPage>
  },
  {
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/order-success/:id',
    element: (
      <OrderSuccessPage></OrderSuccessPage>
    ),
  },
  {
    path: '/orders',
    element: (
      <UserOrdersPage></UserOrdersPage>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: '/chatbot',
    element: (
      <Chatbot></Chatbot>
      // we will add Page later right now using component directly.
    ),
  },
  {
    path: '/profile',
    element: (
      <UserProfilePage></UserProfilePage>
      // we will add Page later right now using component directly.
    ),
    
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
  {
    path: '*',
    element: (
      <PageNotFound></PageNotFound>
    ),
  },
]);




function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }

  }, [dispatch, user])
  return (
    <>
      <div className="App">
      <Provider template={AlertTemplate} {...options}>
        <RouterProvider router={router} />
        {/* Link must be inside the Provider */}
        </Provider>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
