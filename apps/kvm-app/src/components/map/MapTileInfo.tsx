import React from "react";
import { Button } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import {
  getLandImageUrl,
  getLandOwnerImageUrl,
  mapTypeObj,
} from "../../config/constants/map";
import "./MapTileInfo.less";
import { useRecoilValue } from "recoil";
import { curLandState } from "../../recoil/atoms/land";
import Slider from "../Slider";
import { landOwnerState } from "../../recoil/atoms/landOwner";
import { LinkCopyIcon, LocationIcon } from "../svg/svg";
type MapTileInfoProps = {
  // parcelImg: string | undefined;
  infoOpen: boolean;
  // clicked: AtlasTile | undefined; // click Tile
  infoOpenHandle: () => void;
  langSettingHandle: () => void;
};
const MapTileInfo: React.FC<MapTileInfoProps> = (props) => {
  const tile = useRecoilValue(curLandState);
  const landOwner = useRecoilValue(landOwnerState);
  const slides = [];
  if (tile) {
    slides.push({ imageUrl: getLandImageUrl(tile) });
  }
  if (tile && landOwner[`${tile.x},${tile.y}`]?.ownerImage) {
    slides.push({
      imageUrl: getLandOwnerImageUrl(tile),
    });
  }
  return (
    <div className={`mapinfo z10 pt-16 pb-16 ${props.infoOpen ? "open" : ""}`}>
      <Button
        type="text"
        onClick={props.infoOpenHandle}
        className="openclose"
        size={"middle"}
      >
        <CloseOutlined />
      </Button>
      <div className="inner">
        <div className="sec-sliders pl-16 pr-16">
          <div className="sliderbox">
            <Slider slides={slides}></Slider>
          </div>
        </div>
        <div className="sec-info">
          <div className="titl">Location</div>
          <div className="content df">
            <div className="xy">
              <LocationIcon />
              <span className="ml-12 location">
                {tile ? `${tile.x},${tile.y}` : "0,0"}
              </span>
            </div>
            <div className="link curp ml-16" title="Copy Link Address">
              <LinkCopyIcon />
            </div>
            <div
              className="setting curp ml-16"
              title="Setting Land Cover"
              onClick={props.langSettingHandle}
            >
              <SettingOutlined />
            </div>
            {/* <div className="viewlands">
              <button className="ml-12 button view">View Lands</button>
            </div> */}
          </div>
        </div>
        <div className="sec-info">
          <div className="titl">Land Type</div>
          <div className="content">
            {tile ? mapTypeObj[tile.type as keyof typeof mapTypeObj] : ""}
          </div>
        </div>
        <div className="sec-info">
          <div className="titl">Resource storage</div>
          <div className="content"></div>
        </div>
        <div className="sec-info">
          <div className="titl">Occupier</div>
          <div className="content"></div>
        </div>
        <div className="sec-info">
          <div className="titl">Occupier</div>
          <div className="content"></div>
        </div>
        {tile && [0, 1, 2].includes(tile.type) ? (
          <div className="buy-button">
            <Button className="button but">Buy</Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default MapTileInfo;
