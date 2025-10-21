import React, { FC, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import NotFound from "../pages/NotFound";

// 懒加载页面组件
const HomePage = React.lazy(() => import("../pages/HomePage"));
const MapPage = React.lazy(() => import("../pages/MapPage"));
const LandsList = React.lazy(() => import("../pages/LandsList"));
const KarmaRoutes: FC = function () {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/map"
        element={
          <Suspense fallback={<Loading />}>
            <MapPage />
          </Suspense>
        }
      />
      <Route
        path="/lands"
        element={
          <Suspense fallback={<Loading />}>
            <LandsList />
          </Suspense>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default KarmaRoutes;
