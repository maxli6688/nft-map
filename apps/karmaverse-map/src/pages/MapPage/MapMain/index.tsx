import React, {
  // MouseEventHandler,
  useEffect,
  useCallback,
  useState,
  WheelEventHandler,
  memo,
} from "react";
import {
  // useLocation,
  // useParams,
  useSearchParams,
  NavLink,
} from "react-router-dom";
// import logo from './logo.svg'
import "./index.less";
// import { TileMap, Layer, Coord, TileMapProps } from "@karmaverse/kvm-tile-map";
// import { useSize } from 'ahooks';../../dist
// const size = useSize(window.document);
import { useViewport } from "@/hooks";
import { Modal, Tabs } from "antd";
import MapSideBar from "@/components/map/MapSidebar";
import MapTileInfo from "@/components/map/MapTileInfo";
import KarmaMapThumb, {
  thumbMapConf,
} from "@/pages/MapPage/MapMain/KarmaMapThumb";
import KarmaMap from "./KarmaMap";
import type { MapSideBarProps } from "@/components/map/MapSidebar";
import type { MainMapProps } from "./KarmaMap";
import type { ThumbMapProps } from "@/pages/MapPage/MapMain/KarmaMapThumb";
import ImageCrop, { ImageCropProps } from "@/components/ImageCrop";
import { getLandOwner, updateLandOwner } from "@/api/tile";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  landData,
  landOwnerImageState,
  landOwnerState,
} from "@/recoil/atoms/landOwner";
import { curLandState } from "@/recoil/atoms/land";
import MapPopover from "@/components/map/MapPopover";
import LandBorder from "@/components/LandBorder";
import { ListIcon, Location } from "@/components/svg/svg";
import { createImage } from "@/utils";
import { getLandOwnerImageUrl } from "@/config/constants/map";
export const thumbSizeArr = [80, 72, 64, 56, 48, 40, 32, 24, 16, 8];
export const mainScaleArr = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
const { TabPane } = Tabs;
// import { Thing } from '@karmaverse/kvm-tile-map';
function App() {
  const [params, setUrlSearchParams] = useSearchParams();
  function initxy(xy: string | null): number {
    let xy_ = 0;
    if (xy) {
      if (parseInt(xy!) >= -200 && parseInt(xy!) <= 200) {
        xy_ = parseInt(xy!);
      }
      if (parseInt(xy!) < -200) {
        xy_ = -200;
      }
      if (parseInt(xy!) > 200) {
        xy_ = 200;
      }
    }
    return xy_;
  }
  let xx = initxy(params.get("x"));
  let yy = initxy(params.get("y"));
  let zoom = 1; // zoom=1&x=-54&y=-155
  if (params.get("zoom") && mainScaleArr.includes(Number(params.get("zoom")))) {
    zoom = Number(params.get("zoom"));
  }
  console.log(zoom, xx, yy, 333);
  function updateSearchParamszoom(zoom: string) {
    if (params.get("zoom") !== zoom) {
      setUrlSearchParams(
        params.get("x")
          ? {
              zoom: zoom,
              x: params.get("x")!,
              y: params.get("y")!,
            }
          : {
              zoom: zoom,
            }
      );
    }
  }
  function updateSearchParamsxy(coord: { x: number; y: number }) {
    if (
      String(coord.x) !== params.get("x") ||
      String(coord.y) !== params.get("y")
    ) {
      setUrlSearchParams(
        params.get("zoom")
          ? {
              zoom: params.get("zoom")!,
              x: String(coord.x),
              y: String(coord.y),
            }
          : {
              x: String(coord.x),
              y: String(coord.y),
            }
      );
    }
  }
  const view = useViewport();
  // const [thumbScale, setThumbScale] = useState(1);
  let thumbWidth = thumbMapConf.thumbInitialWidth;
  const thumbWidthIndex = mainScaleArr.indexOf(zoom);
  thumbWidth = thumbSizeArr[thumbWidthIndex];
  // const thumbInitialX = (thumbMapConf.width - thumbWidth) / 2;
  const thumbInitialX =
    ((xx + 200) / 400) * thumbMapConf.width - thumbWidth / 2;
  const thumbInitialY =
    ((200 - yy) / 400) * thumbMapConf.width - thumbWidth / 2;
  const [thumbProps, setThumbProps] = useState<Partial<ThumbMapProps>>({
    width: thumbWidth,
    height: thumbWidth,
    x: thumbInitialX,
    y: thumbInitialY,
  });
  let [thumbScaleIndex, setThumbScaleIndex] = useState(thumbWidthIndex);
  const [filterTypes, setFilterTypes] = useState<number[]>([]);
  const [mainScale, setMainScale] = useState(zoom);
  const [mainCenter, setMainCenter] = useState({ x: xx, y: yy });
  // const [clicked, setMainClicked] = useState<AtlasTile>();
  // const [isThumbMove, setIsThumbMove] = useState(false);
  // const [isMainMove, setIsMainMove] = useState(false);
  // const mainMouseUp: MouseEventHandler = (e) => {
  //   setIsMainMove(false);
  //   // console.log(e, 'thumb 2');
  // };
  // const mainMouseDown: MouseEventHandler = (e) => {
  //   setIsMainMove(true);
  //   // console.log(e, 'thumb 1');
  // };
  // const mainMapWheel: WheelEventHandler = (e) => {
  //   // console.log(e, 'main wheel');
  // };
  // const mainMouseMove: MouseEventHandler = (e) => {
  //   if (isMainMove) {
  //     console.log(e, 'thumb Move');
  //   }
  // };
  // console.log(444, mainCenter);
  useEffect(() => {
    setMainScale(zoom);
  }, [zoom]);
  useEffect(() => {
    // setMainClicked() show tile info
    setMainCenter({ x: xx, y: yy });
  }, [xx, yy]);
  function thumbmainWheelHandle(direction: number) {
    if (direction > 0) {
      console.log("zoom out");
      let tmpIndex = thumbScaleIndex - 1;
      if (tmpIndex >= 0 && tmpIndex < thumbSizeArr.length) {
        const thumbProps_ = {
          width: thumbSizeArr[tmpIndex],
          height: thumbSizeArr[tmpIndex],
          x: thumbProps.x! + (thumbProps.width! - thumbSizeArr[tmpIndex]) / 2,
          y: thumbProps.y! + (thumbProps.width! - thumbSizeArr[tmpIndex]) / 2,
        };
        updateSearchParamszoom(String(mainScaleArr[tmpIndex]));
        setThumbScaleIndex(tmpIndex);
        setThumbProps(thumbProps_);
        setMainScale(mainScaleArr[tmpIndex]);
      }
    } else {
      let tmpIndex = thumbScaleIndex + 1;
      console.log("zoom in");
      if (tmpIndex >= 0 && tmpIndex < thumbSizeArr.length - 1) {
        const thumbProps_ = {
          width: thumbSizeArr[tmpIndex],
          height: thumbSizeArr[tmpIndex],
          x: thumbProps.x! + (thumbProps.width! - thumbSizeArr[tmpIndex]) / 2,
          y: thumbProps.y! + (thumbProps.width! - thumbSizeArr[tmpIndex]) / 2,
        };
        updateSearchParamszoom(String(mainScaleArr[tmpIndex]));
        setThumbScaleIndex(tmpIndex);
        setThumbProps(thumbProps_);
        setMainScale(mainScaleArr[tmpIndex]);
      }
    }
  }
  function thumbmainScaleHandle(scale: number) {
    let newIndex = mainScaleArr.indexOf(scale);
    if (newIndex == thumbScaleIndex) {
      return;
    }
    if (newIndex < thumbScaleIndex) {
      console.log("zoom out");
      if (newIndex >= 0 && newIndex < thumbSizeArr.length) {
        const thumbProps_ = {
          width: thumbSizeArr[newIndex],
          height: thumbSizeArr[newIndex],
          x: thumbProps.x! + (thumbProps.width! - thumbSizeArr[newIndex]) / 2,
          y: thumbProps.y! + (thumbProps.width! - thumbSizeArr[newIndex]) / 2,
        };
        setThumbScaleIndex(newIndex);
        setThumbProps(thumbProps_);
        setMainScale(mainScaleArr[newIndex]);
      }
    } else {
      console.log("zoom in");
      if (newIndex >= 0 && newIndex < thumbSizeArr.length - 1) {
        const thumbProps_ = {
          width: thumbSizeArr[newIndex],
          height: thumbSizeArr[newIndex],
          x: thumbProps.x! + (thumbProps.width! - thumbSizeArr[newIndex]) / 2,
          y: thumbProps.y! + (thumbProps.width! - thumbSizeArr[newIndex]) / 2,
        };
        setThumbScaleIndex(newIndex);
        setThumbProps(thumbProps_);
        setMainScale(mainScaleArr[newIndex]);
      }
    }
  }
  const thumbMapWheel: WheelEventHandler = (e) => {
    console.log(e, "thumb wheel");
    // 1 down zoom out -1 up zoom in
    const direction = e.deltaY > 0 ? 1 : -1;
    console.log(e.deltaY);
    thumbmainWheelHandle(direction);
  };
  const thumbMouseMove = (move: { x: number; y: number }) => {
    // calc thumb center
    setThumbProps({ ...thumbProps, ...move });
    const centerCoord = {
      x: move.x + thumbProps.width! / 2,
      y: move.y + thumbProps.width! / 2,
    };
    function getTileCord(coord: { x: number; y: number }) {
      const thumbSize = 300;
      const mainSize = 406;
      return {
        x: Math.floor(mainSize * (coord.x / thumbSize)) - mainSize / 2,
        y: mainSize / 2 - Math.floor(mainSize * (coord.y / thumbSize)),
      };
    }
    let newPos = getTileCord(centerCoord);
    // console.log(move, newPos, 'thumb Move');
    updateSearchParamsxy(newPos);
    setMainCenter(newPos);
  };
  // debounce
  const mainChange: MainMapProps["onChange"] = ({ center, zoom }) => {
    if (
      center.x !== mainCenter.x ||
      center.y !== mainCenter.y ||
      zoom !== mainScale
    ) {
      setUrlSearchParams({
        zoom: String(zoom),
        x: String(center.x),
        y: String(center.y),
      });
    }
    // console.log(center, zoom, 4454555);
    function getThumbCord(coord: { x: number; y: number }) {
      const thumbSize = 300;
      const mainSize = 406;
      return {
        x: Math.floor(thumbSize * (coord.x / mainSize)) + thumbSize / 2,
        y: thumbSize / 2 - Math.floor(thumbSize * (coord.y / mainSize)),
      };
    }
    let zoomIndex = mainScaleArr.indexOf(zoom!);
    let newThumbSize = thumbSizeArr[zoomIndex];
    let newPos = getThumbCord(center);
    if (newThumbSize !== thumbProps.width && newThumbSize !== 8) {
      // if (newThumbSize !== thumbProps.width) {
      // update thumb zoom
      const thumbProps_ = {
        width: newThumbSize,
        height: newThumbSize,
        x: thumbProps.x! + (thumbProps.width! - newThumbSize) / 2,
        y: thumbProps.y! + (thumbProps.width! - newThumbSize) / 2,
      };
      setThumbScaleIndex(zoomIndex);
      setThumbProps(thumbProps_);
    } else if (newPos.x !== thumbProps.x && newPos.y !== thumbProps.y) {
      // update thumb position x,y
      const thumbProps_ = {
        ...thumbProps,
        x: newPos.x - thumbProps.width! / 2,
        y: newPos.y - thumbProps.width! / 2,
      }; // move by 1px
      setThumbProps(thumbProps_);
    }
  };
  const [landOwnerObj, setLandOwnerObj] = useRecoilState(landOwnerState);
  const [landOwnerImageObj, setLandOwnerImage] =
    useRecoilState(landOwnerImageState);
  const curTile = useRecoilValue(curLandState);
  // scale center
  const [sideClose, setSideClose] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const mainClick: MainMapProps["onMainClick"] = useCallback(
    (tile) => {
      console.log(tile);
      setInfoOpen(true);
      if (!tile.r) {
        getLandOwner({ x: tile.x, y: tile.y }).then((res) => {
          console.log(res);
          if (res.status === 1 && res.data.length) {
            const landData_: AtlasTile = {
              ...landData,
              x: tile.x,
              y: tile.y,
              type: tile.type,
              // top: res.data[0].top,
              // left: res.data[0].left,
              // right: !res.data[0].right,
              // bottom: !res.data[0].bottom,
              top: true,
              left: true,
              right: true,
              bottom: true,
              owner: res.data[0].owner,
              wallet: res.data[0].wallet,
              price: res.data[0].price,
              ownerImage: !!res.data[0].image, // TODO
            };
            setLandOwnerObj({
              ...landOwnerObj,
              [`${tile.x},${tile.y}`]: landData_,
            });
            createImage(getLandOwnerImageUrl(tile)).then((res) => {
              setLandOwnerImage({
                ...landOwnerImageObj,
                [`${tile.x},${tile.y}`]: res,
              });
            });
          }
        });
      }
      // setMainClicked(tile);
      // setCurTile(tile);
    },
    [landOwnerObj, landOwnerImageObj]
  );
  // const mapInfoOpen = useCallback(() => {setInfoOpen(!infoOpen);}, []);
  const mapInfoOpen = () => {
    setInfoOpen(!infoOpen);
  };
  const sideBarCenterApply = (coord: { x: number; y: number }) => {
    updateSearchParamsxy(coord);
    setMainCenter({ x: coord.x, y: coord.y });
  };
  const sideCloseHandle = () => {
    setSideClose(!sideClose);
  };
  const infoOpenHandle = () => {
    setInfoOpen(!infoOpen);
  };
  const onFilterTypeChange: MapSideBarProps["onFilterTypeChange"] = (types) => {
    console.log(types);
    setFilterTypes(types);
  };

  let [isLandModalVisible, setLandModal] = useState(false);
  // let [cropimg, setCropImg] = useState<HTMLImageElement>();
  let [cropimgtmp, setCropImgtmp] = useState("");
  const handleBorderOk = useCallback(
    async (config: { top: boolean; left: boolean }) => {
      if (curTile) {
        let landInfo = {
          x: curTile?.x,
          y: curTile?.y,
          top: config.top,
          left: config.left, // identity
        };
        let res = await updateLandOwner(landInfo);
        console.log(res, 3333);
        //setMapData(landInfo) // todo
      }
    },
    [curTile]
  );
  const handleImageOk = useCallback(async () => {
    // update land img base64 ?
    if (curTile) {
      let res = await updateLandOwner({
        x: curTile?.x,
        y: curTile?.y,
        image: cropimgtmp, // identity 存储？
      });
      console.log(res, 3333);
      setLandModal(false);
      // update nft data then
      // setLandOwnerData
    }
  }, [curTile, cropimgtmp]);
  const handleCancel = useCallback(() => {
    setLandModal(false);
  }, []);
  const onlandImageChange: ImageCropProps["onlandImageChange"] = (
    imgString
  ) => {
    setCropImgtmp(imgString);
  };
  const langSettingHandle = () => {
    console.log(curTile);
    setLandModal(true);
  };
  const [settingTabkey, setSettingTabkey] = useState("1");
  const tabChangeHandle = (key: string) => {
    setSettingTabkey(key);
  };
  const sides = {
    top: !!curTile?.top,
    bottom: !!curTile?.bottom,
    left: !!curTile?.left,
    right: !!curTile?.right,
  };
  return (
    // <Thing />
    // <MapBasic />
    <div className="kv-map-box">
      <Modal
        title="Land Setting"
        className="land-setting"
        centered
        width={1000}
        open={isLandModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Tabs onChange={tabChangeHandle}>
          <TabPane tab="Cover Image" key="1"></TabPane>
          <TabPane tab="Border" key="2"></TabPane>
        </Tabs>
        <div className={`tabcontent ${settingTabkey === "1" ? "active" : ""}`}>
          {isLandModalVisible ? (
            <ImageCrop
              onlandImageChange={onlandImageChange}
              onOk={handleImageOk}
              onCancel={handleCancel}
            />
          ) : null}
        </div>
        <div className={`tabcontent ${settingTabkey === "2" ? "active" : ""}`}>
          <LandBorder
            {...sides}
            onCancel={handleCancel}
            onSubmit={handleBorderOk}
          />
        </div>
      </Modal>
      <MapSideBar
        sideClose={sideClose}
        sideCloseHandle={sideCloseHandle}
        sideBarCenterApply={sideBarCenterApply}
        onFilterTypeChange={onFilterTypeChange}
      />
      <MapTileInfo
        infoOpen={infoOpen}
        infoOpenHandle={infoOpenHandle}
        langSettingHandle={langSettingHandle}
        // clicked={clicked}
        // parcelImg={parcelImg}
      />
      <KarmaMapThumb
        className="kv-map-thumb"
        onWheel={thumbMapWheel}
        onMouseMove={thumbMouseMove}
        // onMouseDown={thumbMouseDown}
        // onMouseUp={thumbMouseUp}
        {...thumbProps}
        // zoom={thumbScale}
        thumbmainWheelHandle={thumbmainWheelHandle}
        thumbmainScaleHandle={thumbmainScaleHandle}
        mainScale={mainScale}
        sideclose={sideClose}
        // thumbImgs={thumbImgs}
      />
      <div
        className="kv-map-main"
        // onWheel={mainMapWheel}
        // onMouseDown={mainMouseDown}
        // onMouseUp={mainMouseUp}
        // onMouseMove={mainMouseMove}
      >
        <MapPopover />
        <div className="menu-float">
          <NavLink to="/lands">
            <div className="left">
              <ListIcon />
            </div>
          </NavLink>
          <div className="right">
            <Location />
          </div>
        </div>
        <KarmaMap
          width={Math.min(1920, view.width)}
          height={Math.min(1080, view.height - 64)}
          zoom={mainScale}
          x={mainCenter.x}
          y={mainCenter.y}
          onChange={mainChange}
          onMainClick={mainClick}
          mapInfoOpen={mapInfoOpen}
          filterTypes={filterTypes}
        />
      </div>
    </div>
  );
}

export default memo(App);
