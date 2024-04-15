import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Home from "./pages/Home.jsx";
import Signin from "./pages/auth/Signin.jsx";
import Signup from "./pages/auth/Signup.jsx";
import AuthRedirect from "./pages/auth/AuthRedirect.jsx";
import ProtectedAdmin from "./pages/admin/ProtectedAdmin.jsx";
import AdmProduct from "./pages/admin/product/AdmProduct.jsx";
import AdmMovie from "./pages/admin/movie/AdmMovie.jsx";
import AdmBlog from "./pages/admin/blog/AdmBlog.jsx";
import AdmProductLayout from "./pages/admin/AdmProductLayout.jsx";
import AdmProductCategory from "./pages/admin/product/AdmProductCategory.jsx";
import AdmUser from "./pages/admin/user/AdmUser.jsx";
import AdmUserPost from "./pages/admin/user/AdmUserPost.jsx";
import AdmUserUpdate from "./pages/admin/user/AdmUserUpdate.jsx";
import Product from "./pages/product/Product.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Movie from "./pages/movie/Movie.jsx";
import AdmProductPost from "./pages/admin/product/AdmProductPost.jsx";
import AdmUserDetail from "./pages/admin/user/AdmUserDetail.jsx";
import AdmProductDetail from "./pages/admin/product/AdmProductDetail.jsx";
import AdmProductUpdate from "./pages/admin/product/AdmProductUpdate.jsx";
import ProductDetail from "./pages/product/ProductDetail.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="product">
        <Route index element={<Product />} />
        <Route path="detail/:id" element={<ProductDetail />} />
      </Route>
      <Route path="blog" element={<Blog />} />
      <Route path="movie" element={<Movie />} />
      <Route element={<AuthRedirect />}>
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route element={<ProtectedAdmin />}>
        <Route element={<AdmProductLayout />}>
          <Route path="adm-product">
            <Route index element={<AdmProduct />} />
            <Route path="post" element={<AdmProductPost />} />
            <Route path="detail/:id" element={<AdmProductDetail />} />
            <Route path="update/:id" element={<AdmProductUpdate />} />
          </Route>
          <Route path="adm-product-category">
            <Route index element={<AdmProductCategory />} />
          </Route>
        </Route>
        <Route path="adm-movie" element={<AdmMovie />} />
        <Route path="adm-blog" element={<AdmBlog />} />
        <Route path="adm-users">
          <Route index element={<AdmUser />} />
          <Route path="post" element={<AdmUserPost />} />
          <Route path="update/:id" element={<AdmUserUpdate />} />
          <Route path="detail/:id" element={<AdmUserDetail />} />
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
