import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import React, { Suspense } from "react";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Members = React.lazy(() => import("./pages/Members"));
const MemberDetail = React.lazy(() => import("./pages/MemberDetail"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Loyalty = React.lazy(() => import("./pages/Loyalty"));
const Segmentation = React.lazy(() => import("./pages/Segmentation"));
const Campaigns = React.lazy(() => import("./pages/Campaigns"));
const Queue = React.lazy(() => import("./pages/Queue"));
const Feedback = React.lazy(() => import("./pages/Feedback"));
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
            <Route path="members" element={<Members />} />
            <Route path="members/:id" element={<MemberDetail />} />
            <Route path="orders" element={<Orders />} />
            <Route path="loyalty" element={<Loyalty />} />
            <Route path="segmentation" element={<Segmentation />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="queue" element={<Queue />} />
            <Route path="feedback" element={<Feedback />} />
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
