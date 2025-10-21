import { lazy, Suspense } from "react";
import Loading from "../../components/Loading/Loading";

// 懒加载大型地图组件
const MapMain = lazy(() => import("./MapMain/index"));
const KarmaMapLite = lazy(() => import("./MapLite"));

const MapPage = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <MapMain />
      </Suspense>
      <div className="mlite hidex">
        <Suspense fallback={<Loading />}>
          <KarmaMapLite />
        </Suspense>
      </div>
    </>
  );
};

export default MapPage;
