import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import React, { Suspense } from "react";
import Loading from "./components/Loading";

// Pages (Main)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Staff = React.lazy(() => import("./pages/Staff"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const Settings = React.lazy(() => import("./pages/Settings"));

// Pages (Auth)
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="staff" element={<Staff />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
