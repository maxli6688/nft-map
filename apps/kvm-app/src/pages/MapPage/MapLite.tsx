import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { TileMapLite, Layer, Coord, TileMapProps } from "@kvm/kvm-tile-map";
// import type { TileMap } from '@kvm/kvm-tile-map';
import { mapColorObj } from "../../config/constants/map";
import { mapDataState } from "../../recoil/atoms/map";
import { thumbBase64State } from "../../recoil/atoms/thumbBase64";
import { curLandState } from "../../recoil/atoms/land";
import { landDefaultCoverImageSelect } from "../../recoil/selectors/landCoverSelect";

const tileRange = 400;
/*
用于Thumb生成展示用图片
*/
const KarmaMapLite: React.FC = () => {
  const [thumbbase64Arr, setThumbImage] = useRecoilState(thumbBase64State);
  // if (thumbbase64Arr.length === 25) {
  //   return null;
  // }
  const tilRef = useRef<TileMapLite>(null);
  const mapData = useRecoilValue(mapDataState);
  const blockMapProps: Partial<TileMapProps> = {
    width: 308, //78*8,
    height: 308,
    size: 4,
    // minSize: 8,
    // maxSize: 16,
    // panX: -4,
    // panY: 4.5,
    zoom: 1,
    minX: -(tileRange / 2),
    maxX: tileRange / 2,
    minY: -(tileRange / 2),
    maxY: tileRange / 2,
  };
  const coords = [
    { x: -161, y: 160 },
    { x: -81, y: 160 },
    { x: -1, y: 160 },
    { x: 79, y: 160 },
    { x: 159, y: 160 },
    { x: -161, y: 80 },
    { x: -81, y: 80 },
    { x: -1, y: 80 },
    { x: 79, y: 80 },
    { x: 159, y: 80 },
    { x: -161, y: 0 },
    { x: -81, y: 0 },
    { x: -1, y: 0 },
    { x: 79, y: 0 },
    { x: 159, y: 0 },
    { x: -161, y: -80 },
    { x: -81, y: -80 },
    { x: -1, y: -80 },
    { x: 79, y: -80 },
    { x: 159, y: -80 },
    { x: -161, y: -160 },
    { x: -81, y: -160 },
    { x: -1, y: -160 },
    { x: 79, y: -160 },
    { x: 159, y: -160 },
  ];
  let [done, setDone] = useState(false);
  let [thumbImgs, setThumbImgs] = useState<string[]>([]);
  let [xy, setxy] = useState({ x: 0, y: 0 });
  let timer: ReturnType<typeof setTimeout>;
  const makePng = (index: number) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (tilRef.current) {
        const png = tilRef.current.getPng();
        console.log(thumbImgs.length, index);
        thumbImgs.push(png);
        setThumbImgs(thumbImgs.slice());
      }
    }, 10);
  };
  useEffect(() => {
    if (thumbbase64Arr.length !== 25) {
      for (let index = 0; index < coords.length; index++) {
        setTimeout(() => {
          setxy(coords[index]);
          makePng(index);
        }, (index + 1) * 250);
      }
    }
  }, []);
  useEffect(() => {
    // console.log(thumbImgs.length);
    if (thumbImgs.length && thumbbase64Arr.length !== 25) {
      setThumbImage([...thumbImgs]);
    }
  }, [thumbImgs]);

  const atlasLayer: Layer = (x, y) => {
    let color = (x + y) % 2 === 0 ? mapColorObj[13] : mapColorObj[14];
    const xx = x + 0 === 0 ? 0 : x;
    const yy = y + 0 === 0 ? 0 : y;
    const id = `${xx},${yy}`;
    if (mapData && id in mapData) {
      const tileColor =
        mapColorObj[mapData[id]["type"] as keyof typeof mapColorObj];
      return {
        color: tileColor,
      };
    } else {
      return {
        color,
      };
    }
  };
  if (thumbbase64Arr.length === 25) {
    return null;
  }
  return done ? null : (
    <TileMapLite
      {...blockMapProps}
      x={xy.x}
      y={xy.y}
      ref={tilRef}
      layers={[atlasLayer]}
      className="atlaslite"
    />
  );
};

const parcelMapProps: Partial<TileMapProps> = {
  width: 576, //18*16,
  height: 576,
  size: 64,
  zoom: 1,
  // panX: -4.6,
  // panY: 4.5,
  minX: -(tileRange / 2),
  maxX: tileRange / 2,
  minY: -(tileRange / 2),
  maxY: tileRange / 2,
};
//用于生成小图缩略图
const KarmaMapLiteParcel: React.FC = () => {
  const mapData = useRecoilValue(mapDataState);
  // const tilRef = useRef<TileMapLite>(null);
  const landCoverImage = useRecoilValue(landDefaultCoverImageSelect);
  const [curTile, setCurTile] = useRecoilState(curLandState);
  const [png, setPng] = useState("");
  const [xy, setXy] = useState<Coord>();
  // const [yy, setYy] = useState<number>(curTile?.y ?? 0);
  const atlasLayer: Layer = (x, y) => {
    // const { tiles } = this.state;
    let color = (x + y) % 2 === 0 ? mapColorObj[13] : mapColorObj[14];
    const xx = x + 0 === 0 ? 0 : x;
    const yy = y + 0 === 0 ? 0 : y;
    const id = `${xx},${yy}`;
    // if (atlas !== null && id in atlas) {
    if (mapData && id in mapData) {
      // const tile = mapData[id];
      // const type_ = tile.type;
      const tileColor =
        mapColorObj[mapData[id]["type"] as keyof typeof mapColorObj];
      // console.log(tile);
      //   const tile = atlas[id];
      //   const top = !!tile.top;
      //   const left = !!tile.left;
      //   const topLeft = !!tile.topLeft; //边界问题
      return {
        color: tileColor,
        image: landCoverImage[mapData[id]["type"]],
        // top,
        // left,
        // topLeft,
      };
    } else {
      return {
        color,
      };
    }
  };
  const clickedLayer: Layer = (x, y) => {
    return curTile?.x && curTile?.x === x && curTile?.y === y
      ? {
          // color: '#d00d81',
          border: "#c0086c",
        }
      : null;
  };
  // let timer: ReturnType<typeof setInterval>; // try 3 time
  // const makePng = () => {
  //   clearInterval(timer);
  //   let count = 0;
  //   timer = setInterval(() => {
  //     // console.log(count);
  //     count++;
  //     if (tilRef.current && curTile) {
  //       const png = tilRef.current.getPng();
  //       if (png) {
  //         clearInterval(timer);
  //         setCurTile({ ...curTile, landBash64Img: png });
  //       }
  //     }
  //     if (count > 2) {
  //       clearInterval(timer);
  //     }
  //   }, 50);
  // };
  const makePngcb = useCallback((png: string) => {
    if (png) {
      // console.log(55555);
      setPng(png);
    }
  }, []);
  /*   useEffect(() => {
    // console.log('image update', xx, yy, curTile);
    if (
      png &&
      typeof curTile?.x === 'number' &&
      typeof xy === 'object' &&
      xy.x === curTile.x &&
      xy.y === curTile.y
    ) {
      console.log('image update');
      setCurTile({ ...curTile, landBash64Img: png });
    }
  }, [png]); */
  useEffect(() => {
    if (
      typeof curTile?.x === "number" &&
      (xy?.x !== curTile.x || xy?.y !== curTile.y)
    ) {
      console.log("xy update ", curTile.x, curTile.y);
      setXy({ x: curTile.x, y: curTile.y });
    }
  }, [curTile?.x, curTile?.y]);
  console.log("map lite parcel render", xy);
  return typeof xy?.x === "number" ? (
    <TileMapLite
      {...parcelMapProps}
      x={xy?.x}
      y={xy?.y}
      // ref={tilRef}
      layers={[atlasLayer, clickedLayer]}
      // onRendered={() => {
      //   console.log('map lite parcel rendered');
      //   makePngcb(); // useCallback?
      // }}
      onRendered={makePngcb}
      className="atlasliteparcel"
    />
  ) : null;
};
// const KarmaMapLite = React.memo(KarmaMapLiteThumb);
// const KarmaMapLiteParcel = React.memo(KarmaMapLiteParcelItem);
export { KarmaMapLite, KarmaMapLiteParcel };

export default KarmaMapLite;
