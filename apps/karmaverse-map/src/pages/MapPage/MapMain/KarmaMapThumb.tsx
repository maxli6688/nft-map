import React, {
  useState,
  useRef,
  useEffect,
  ChangeEventHandler,
  WheelEventHandler,
} from "react";
import Konva from "konva";
import { Stage, Layer, Rect, Group, Image } from "react-konva";
import type { StageProps } from "react-konva";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
// import { KonvaEventObject } from 'konva';
import { KonvaEventObject } from "konva/lib/Node";
import { mainScaleArr, thumbSizeArr } from ".";
import { useRecoilValue } from "recoil";
import { thumbBase64State } from "../../../recoil/atoms/thumbBase64";
// import { thumbImageUrl } from './config/map';

export type ThumbMapProps = {
  className?: string;
  // thumbImgs: string[];
  sideclose: boolean;
  mainScale?: number; //thumb width
  width?: number; //thumb width
  height?: number; //thumb height
  x?: number; //thumb x
  y?: number; //thumb y
  zoom?: number;
  center?:
    | {
        x: number;
        y: number;
      }
    | undefined;
  onWheel: WheelEventHandler;
  onMouseMove: (move: { x: number; y: number }) => void;
  // onMouseUp: MouseEventHandler;
  // onMouseDown: MouseEventHandler;
  thumbmainWheelHandle?: (direction: number) => void;
  thumbmainScaleHandle?: (scale: number) => void;
  onChange?: (params: {
    center?:
      | {
          x: number;
          y: number;
        }
      | undefined;
    zoom?: number | undefined;
  }) => void;
};

export const thumbMapConf = {
  width: 300,
  height: 300,
  col: 5,
  row: 5,
  space: 2,
  thumbInitialWidth: 72,
  viewPortColor: "#cc3333",
  viewPortStrokeWidth: 2,
};
// click
const KarmaMapThumb: React.FC<ThumbMapProps> = (props) => {
  const thumbimglist_ = useRecoilValue(thumbBase64State);
  const [thumbimglist, setThumbimglist] = useState<HTMLImageElement[]>([]); // string to image
  const viewportInitX =
    (thumbMapConf.width - thumbMapConf.thumbInitialWidth) / 2;
  const [thumbClose, setThumbClose] = useState(false);
  const stageRef = useRef<Konva.Stage>(null);
  const viewPortRef = useRef<Konva.Rect>(null);
  // const [curScale, setCurScale] = useState({ x: 1, y: 1 });
  // const [curScale, setCurScale] = useState(1);
  // const [viewportCenter, setViewportCenter] = useState({
  //   x: thumbMapConf.width / 2,
  //   y: thumbMapConf.width / 2,
  // });
  // const [lastPos, setLastPos] = useState({
  //   x: viewportInitX,
  //   y: viewportInitX,
  // });
  // const [newPos, setNewPos] = useState<{ x: number; y: number } | null>(null);
  // const [move, setMove] = useState({
  //   x: 0,
  //   y: 0,
  // });
  // const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
  //   // console.log(e.currentTarget.getRelativePointerPosition());
  // };
  const handleZoom = (e: KonvaEventObject<WheelEvent>) => {};
  const handleDrag = (e: KonvaEventObject<DragEvent>) => {
    const attrs_ = e.target.attrs;
    let tmpPos = { x: 0, y: 0 };
    if (attrs_.x > 150) {
      tmpPos.x = Math.max(
        0,
        Math.min(attrs_.x, thumbMapConf.width - attrs_.width / 2)
      );
    } else {
      tmpPos.x = Math.max(attrs_.x, -attrs_.width / 2);
    }
    if (attrs_.y > 150) {
      tmpPos.y = Math.max(
        0,
        Math.min(attrs_.y, thumbMapConf.width - attrs_.width / 2)
      );
    } else {
      tmpPos.y = Math.max(attrs_.y, -attrs_.width / 2);
    }
    e.target.x(tmpPos.x);
    e.target.y(tmpPos.y);
    //boundary
    props.onMouseMove({ x: attrs_.x, y: attrs_.y });
  };

  let smallmapWidth =
    (thumbMapConf.width - (thumbMapConf.col + 1) * thumbMapConf.space) /
    thumbMapConf.col;
  // smallmapWidth = Math.floor(smallmapWidth); //5x5
  const thumbMapProps: StageProps = {
    width: thumbMapConf.width,
    height: thumbMapConf.height,
    x: 0,
    y: 0,

    onWheel: handleZoom,
    // onDragMove: handleDrag,
  };
  const [sliderval, setSliderval] = useState(1);
  const sliderChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSliderval(Number(e.target.value));
    let newScale = Math.floor(Number(e.target.value) / 0.5) * 0.5;
    props.thumbmainScaleHandle?.(newScale);
  };
  const sliderPlus = () => {
    let newVal = sliderval + 0.5;
    if (newVal < 5) {
      setSliderval(newVal);
      props.thumbmainWheelHandle?.(-1);
    }
  };
  const sliderMinus = () => {
    let newVal = sliderval - 0.5;
    if (newVal > 0) {
      setSliderval(newVal);
      props.thumbmainWheelHandle?.(1);
    }
  };
  const viewPortProps: Konva.NodeConfig = {
    // fill: 'green',
    stroke: thumbMapConf.viewPortColor,
    strokeWidth: thumbMapConf.viewPortStrokeWidth,
    // do not scale strokes
    strokeScaleEnabled: false,
    shadowBlur: 3000,
    shadowColor: "grey",
    draggable: true,
    onMouseOver: () => {
      document.body.style.cursor = "pointer";
    },
    onMouseOut: () => {
      document.body.style.cursor = "default";
    },
    onDragMove: handleDrag,

    // fill: 'yellow',
    // onTouchStart: handleMouseMove, onClick onTap onMouseDown
    // onMouseMove: handleMouseMove,
    // style: {
    //   backgroundColor: 'lightgray',
    // },
    // x: 20,
    // y: 20,
    // width: 100,
    // height: 50,
    // width: size,
    // height: size,
    // fill: 'yellow',
    // offsetX: size / 2,
    // offsetY: size / 2,
    // cornerRadius: 5,
  };
  useEffect(() => {
    // console.log(props.width, props.mainScale, 3333333);
    const thumbIndex = thumbSizeArr.indexOf(props.width!);
    const thumbScale = mainScaleArr[thumbIndex];
    setSliderval(thumbScale);
  }, [props.width]);
  useEffect(() => {
    // console.log(thumbimglist_.length);
    setThumbimglist(
      thumbimglist_.map((item) => {
        const image = new window.Image();
        image.src = item;
        return image;
      })
    );
  }, [thumbimglist_]);
  return (
    <div
      className={`${props.className} ${props.sideclose ? "close" : ""} ${
        thumbClose ? "hide" : ""
      }`}
    >
      <Button
        type="primary"
        onClick={() => {
          setThumbClose(!thumbClose);
        }}
        className="openclose"
        size={"middle"}
      >
        <LeftOutlined />
      </Button>
      <div className="inner">
        <div className="mapslider">
          <Button type="primary" onClick={sliderPlus} className="sbtn plus">
            <span className="plusicon"></span>
          </Button>
          <div className="slider">
            <input
              type="range"
              min="0.5"
              max="4.5"
              step="0.01"
              className="vertical"
              value={sliderval}
              onChange={sliderChange}
              id="myRange"
            />
          </div>

          <Button type="primary" onClick={sliderMinus} className="sbtn minus">
            <span className="minusicon"></span>
          </Button>
        </div>
        <div className="thumb-map" onWheel={props.onWheel}>
          {/* <img src={thumbImageUrl} className="dn1" width={300} height={300} /> */}
          <Stage {...thumbMapProps} ref={stageRef}>
            <Layer id="maps">
              {thumbimglist.length == 25 ? (
                <Group>
                  <Rect
                    x={0}
                    y={0}
                    width={thumbMapConf.width}
                    height={thumbMapConf.height}
                    fill={"#00B0F0"}
                  />
                  {thumbimglist.map((item, i) => (
                    <Image
                      key={i}
                      x={
                        (i % thumbMapConf.col) *
                          (smallmapWidth + thumbMapConf.space) +
                        thumbMapConf.space
                      }
                      y={
                        Math.floor(i / thumbMapConf.col) *
                          (smallmapWidth + thumbMapConf.space) +
                        thumbMapConf.space
                      }
                      image={item}
                      width={smallmapWidth}
                      height={smallmapWidth}
                    />
                  ))}
                </Group>
              ) : null}
              <Group>
                <Rect
                  id="viewport"
                  {...viewPortProps}
                  ref={viewPortRef}
                  x={props.x}
                  y={props.y}
                  // scaleX={1.2}
                  // scaleY={1.2}
                  width={props.width}
                  height={props.width}
                />
              </Group>
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
};
export default React.memo(KarmaMapThumb);
