import React, { useEffect, useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { TileMap, Layer, TileMapProps } from "@kvm/kvm-tile-map";
import { mapColorObj } from "@/config/constants/map";
import { mapDataState } from "@/recoil/atoms/map";
import { curLandState } from "@/recoil/atoms/land";
import { landHoverState } from "@/recoil/atoms/land";
import { landDefaultCoverImageSelect } from "@/recoil/selectors/landCoverSelect";
import { landOwnerImageState } from "@/recoil/atoms/landOwner";
import useLandOwners from "@/hooks/useLandOwners";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// const myErrorHandler = (error: Error, info: { componentStack: string }) => {
// 	// Do something with the error
// 	// E.g. log to an error logging client here
// 	console.log(error);
// };
const tileRange = 400;
// const borderSize = tileRange / 2;
// const atlasLayer1: Layer = (x, y) => {
//   // const { tiles } = this.state;
//   const id = x + ',' + y;
//   // if (tiles && id in tiles) {
//   // const tile = tiles[id];
//   // if (atlas !== null && id in atlas) {
//   //   const tile = atlas[id];
//   //   const color = mapColorObj[tile.type];
//   //   const top = !!tile.top;
//   //   const left = !!tile.left;
//   //   const topLeft = !!tile.topLeft;
//   if (x > -borderSize && x < borderSize && y > -borderSize && y < borderSize) {
//     const top = (x + 40) % 81 === 0;
//     const left = (y + 40) % 81 === 0;
//     let color = top || left ? mapColorObj[7] : mapColorObj[8];
//     if (['0,0', '0,1', '1,0', '1,1'].includes(id)) {
//       color = '#00ff00'; // center
//     }
//     return {
//       color,
//       top,
//       left,
//       // topLeft,
//     };
//   } else if ((x === -200 || x === 200) && y > -200 && y < 200) {
//     // left border
//     return {
//       color: mapColorObj[7],
//       top: true,
//       left: x === 200 && [122, 41, -40, -121].includes(y),
//     };
//   } else if ((y === -200 || y === 200) && x > -200 && x < 200) {
//     // right border
//     return {
//       color: mapColorObj[7],
//       top: y === -200 && [122, 41, -40, -121].includes(x),
//       left: true,
//     };
//   } else if (['-200,200', '200,200', '-200,-200', '200,-200'].includes(id)) {
//     // four corner
//     const corner = {
//       '-200,200': { color: mapColorObj[7] },
//       '200,200': { color: mapColorObj[7], left: true },
//       '-200,-200': { color: mapColorObj[7], top: true },
//       '200,-200': { color: mapColorObj[7], top: true, left: true },
//     };
//     return corner[id as keyof typeof corner];
//   } else {
//     return {
//       color: (x + y) % 2 === 0 ? mapColorObj[13] : mapColorObj[14],
//     };
//   }
// };

// click
export type MainMapProps = Partial<TileMapProps> & {
  className?: string;
  zoom?: number | undefined;
  filterTypes?: number[];
  center?: {
    x: number;
    y: number;
  };
  onMainClick: (tile: AtlasTile) => void;
  mapInfoOpen: () => void;
  onChange?: (params: {
    center: {
      x: number;
      y: number;
    };
    zoom?: number;
  }) => void;
};
const mainMapProps: Partial<TileMapProps> = {
  // width: props.width,
  // height: props.height,
  size: 16,
  minSize: 8,
  maxSize: 80,
  minX: -(tileRange / 2),
  maxX: tileRange / 2,
  minY: -(tileRange / 2),
  maxY: tileRange / 2,
};
const KarmaMap: React.FC<MainMapProps> = (props) => {
  const mapData = useRecoilValue(mapDataState);
  const landCoverImage = useRecoilValue(landDefaultCoverImageSelect);
  const landOwnerImage = useRecoilValue(landOwnerImageState);
  const { landOwner } = useLandOwners();
  const [curTile, setCurTile] = useRecoilState(curLandState);
  // const userImageLayer: Layer = (x, y) => {
  //   // if (curTile && curTile.x === x && curTile.y === y && props.cropimg) {
  //   //   return {
  //   //     image: props.cropimg, //
  //   //   };
  //   // }
  //   return null;
  // };
  const setTileHover = useSetRecoilState(landHoverState);
  const popupChange: TileMapProps["onPopup"] = useCallback(
    (params: {
      x: number;
      y: number;
      top: number;
      left: number;
      visible: boolean;
    }) => {
      setTileHover(params);
    },
    []
  );
  const clickedFillLayer: Layer = (x, y) => {
    if (curTile && curTile.x === x && curTile.y === y) {
      return {
        border: "#c0086c", //
      };
    }
    return null;
  };
  // scale is draw scale clickedFillLayer clickedStrokeLayer { color: '#00ff00', scale: 1.4 }
  const atlasLayer: Layer = (x, y) => {
    // const { tiles } = this.state;
    let color: string = (x + y) % 2 === 0 ? mapColorObj[13] : mapColorObj[14];
    const xx = x + 0 === 0 ? 0 : x;
    const yy = y + 0 === 0 ? 0 : y;
    const id = `${xx},${yy}`;
    const leftid = `${xx - 1},${yy}`;
    const rightid = `${xx + 1},${yy}`;
    const topid = `${xx},${yy + 1}`;
    const bottomid = `${xx},${yy - 1}`;
    // if (atlas !== null && id in atlas) {
    if (mapData && id in mapData) {
      const tile = mapData[id]; //big object fast //边界数据 过滤河道数据？
      const type_ = tile.type;
      const tileColor = mapColorObj[type_ as keyof typeof mapColorObj];
      let image = landOwnerImage[id] || landCoverImage[type_];
      if (props.filterTypes?.length) {
        if (type_ === 9) {
          color = tileColor;
        }
        if (props.filterTypes.includes(type_!)) {
          color = tileColor;
        } else {
          image = null;
        }
      } else {
        color = tileColor;
      }
      const land = landOwner[id];
      let top = false;
      let left = false;
      let right = false;
      let bottom = false;
      // if (land) {
      //   top = !!land.top;
      //   left = !!land.left;
      //   right = !!land.right;
      //   bottom = !!land.bottom;
      // }
      top = !!land?.top && !!landOwner[topid]?.bottom;
      bottom = !!land?.bottom && !!landOwner[bottomid]?.top;
      left = !!land?.left && !!landOwner[leftid]?.right;
      right = !!land?.right && !!landOwner[rightid]?.left;

      // if (id === '6,-66' || id === '6,-66' || id === '7,-66' || id === '7,-66') {
      //   console.log(land, top, bottom, left, right);
      // }
      return {
        color,
        image,
        top,
        left,
        right,
        bottom,
      };
    } else {
      return {
        color,
      };
    }
  };
  console.log("karmamap render");
  return (
    <TileMap
      {...mainMapProps}
      width={props.width}
      height={props.height}
      x={props.x}
      y={props.y}
      zoom={props.zoom}
      layers={[
        atlasLayer,
        // selectedStrokeLayer,
        // selectedFillLayer,
        // userImageLayer,
        clickedFillLayer,
      ]}
      // layers={[atlasLayer, onSaleLayer, selectedStrokeLayer, selectedFillLayer]}
      onClick={(x, y) => {
        if (x === curTile?.x && y === curTile.y) {
          props.mapInfoOpen();
          return;
        }
        // let tile = mapData[`${x},${y}`];
        const tile = landOwner[`${x},${y}`]
          ? { ...landOwner[`${x},${y}`], type: mapData[`${x},${y}`]["type"] }
          : mapData[`${x},${y}`];
        console.log(tile, 34232234);
        setCurTile(tile);
        props.onMainClick(tile);
      }}
      onChange={props.onChange}
      onPopup={popupChange}
      className="atlas"
    />
  );
};
export default React.memo(KarmaMap);
