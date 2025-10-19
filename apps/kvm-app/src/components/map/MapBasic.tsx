import { TileMap, Layer, Coord } from "@kvm/kvm-tile-map";
const simpleLayer: Layer = (x, y) => {
  return {
    color: "#eeeeee",
  };
};
// prettier-ignore
const selected: Coord[] = [
  { x: 0, y: 0 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 1, y: 2 }
]

function isSelected(x: number, y: number) {
  return selected.some((coord) => coord.x === x && coord.y === y);
}

const chessboardLayer: Layer = (x, y) => {
  return {
    color: (x + y) % 2 === 0 ? "#eeeeee" : "#999999",
  };
};

const selectedStrokeLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: "#00ff00", scale: 1.4 } : null;
};

const selectedFillLayer: Layer = (x, y) => {
  return isSelected(x, y) ? { color: "#00dd00", scale: 1.2 } : null;
};

const MapBasic1 = () => {
  return (
    <div style={{ margin: "10px" }}>
      {/* <TileMap layers={[simpleLayer]} /> */}
      <div>Selection</div>
      <TileMap
        layers={[chessboardLayer, selectedStrokeLayer, selectedFillLayer]}
      />
    </div>
  );
};

let hover: Coord = { x: 0, y: 0 };

const isPositive = (x: number, y: number) => x > 0 && y > 0;
const positiveLayer: Layer = (x, y) => {
  return {
    color: isPositive(x, y) ? "#eeeeee" : "#999999",
  };
};

const hoverLayer: Layer = (x, y) => {
  return hover.x === x && hover.y === y
    ? { color: isPositive(x, y) ? "#ff0000" : "#00ff00" }
    : null;
};
// hover
const MapBasic2 = () => {
  return (
    <TileMap
      layers={[positiveLayer, hoverLayer]}
      onHover={(x, y) => (hover = { x, y })}
    />
  );
};
const selected2: Coord[] = [];

function isSelected2(x: number, y: number) {
  return selected2.some((coord) => coord.x === x && coord.y === y);
}
const clickedLayer: Layer = (x, y) => {
  return {
    color: isSelected2(x, y) ? "#00ff00" : "#999999",
  };
};
// click

const connectedLayer: Layer = (x, y) => {
  const top = x % 81 === 0;
  const left = y % 81 === 0;
  return {
    color: top || left ? "#999999" : "#eeeeee",
    top,
    left,
  };
};
const MapBasic = () => {
  return (
    // <TileMap
    //   layers={[clickedLayer]}
    //   onClick={(x, y) => (selected2[0] = { x, y })}
    // />
    <TileMap
      width={1920}
      height={1000}
      layers={[connectedLayer]}
      onClick={(x, y) => {
        console.log(x, y);
        selected2[0] = { x, y };
      }}
    />
  );
};
export default MapBasic;
