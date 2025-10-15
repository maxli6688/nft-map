import { useState } from "react";
import { Popover } from "antd";
import { useRecoilValue } from "recoil";
import { landHoverState } from "../../recoil/atoms/land";
import "./MapPopover.less";

// 停留1s 显示
const MapPopover = () => {
  const tileHover = useRecoilValue(landHoverState);
  let popStyle = {};
  if (tileHover) {
    popStyle = { top: `${tileHover.top}px`, left: `${tileHover.left + 10}px` };
  }
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  // const [popStyle, setPopStyle] = useState({ top: '-999px', left: '-999px' });
  // // debounce
  // const mainPopup: MainMapProps['onPopup'] = (params) => {
  //   setPopStyle({ top: `${params.top}px`, left: `${params.left + 10}px` });
  // };
  return show ? (
    <div className="popup land-popup" style={popStyle}>
      <div className="land-popvoer">
        <div className="landtype">Land Type:</div>
        <div className="land-position">{`${tileHover?.x},${tileHover?.y}`}</div>
      </div>
    </div>
  ) : null;
};
export default MapPopover;
