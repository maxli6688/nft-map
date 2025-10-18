import React, {
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import "./MapSidebar.less";
import { Button, Checkbox, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { mapTypeObj, mapColorObj } from "../../config/constants/map";
import { Coord } from "@karmaverse/kvm-tile-map";

// import { stages } from 'konva/lib/Stage';
type ICheckItem = {
  name: string;
  value: string | number;
  color?: string;
  checked: boolean;
};
export type MapSideBarProps = {
  sideClose: boolean;
  sideCloseHandle: () => void;
  sideBarCenterApply: (coord: Coord) => void;
  onFilterTypeChange: (filterTypes: number[]) => void;
};
const MapSideBar: React.FC<MapSideBarProps> = (props) => {
  const typeConf: ICheckItem[] = [
    {
      name: mapTypeObj["0"],
      value: 0,
      color: mapColorObj["0"],
      checked: false,
    },
    {
      name: mapTypeObj["1"],
      value: 1,
      color: mapColorObj["1"],
      checked: false,
    },
    {
      name: mapTypeObj["2"],
      value: 2,
      color: mapColorObj["2"],
      checked: false,
    },
    {
      name: mapTypeObj["3"],
      value: 3,
      color: mapColorObj["3"],
      checked: false,
    },
    {
      name: mapTypeObj["4"],
      value: 4,
      color: mapColorObj["4"],
      checked: false,
    },
    {
      name: mapTypeObj["5"],
      value: 5,
      color: mapColorObj["5"],
      checked: false,
    },
  ];
  const statusConf = [
    { name: "On Sale", value: "onSale", checked: false },
    // { name: 'Premium', value: 'Premium', checked: false },
    // { name: 'On OpenSea', value: 'onOpensea', checked: false },
  ];
  const [types, setTypes] = useState(typeConf);
  const [status, setStatus] = useState(statusConf);
  function onStatusChange(
    e: CheckboxChangeEvent,
    item: ICheckItem,
    index: number
  ) {
    console.log(`checked`, e.target, item);
    if (e.target.checked) {
      setStatus(
        status.map((item, i) => {
          if (i === index) {
            return { ...item, checked: true };
          }
          return item;
        })
      );
    } else {
      setStatus(
        status.map((item, i) => {
          if (i === index) {
            return { ...item, checked: false };
          }
          return item;
        })
      );
    }
  }
  function onTypeChange(
    e: CheckboxChangeEvent,
    item: ICheckItem,
    index: number
  ) {
    console.log(`checked`, e.target, item);
    if (e.target.checked) {
      setTypes(
        types.map((item, i) => {
          if (i === index) {
            return { ...item, checked: true };
          }
          return item;
        })
      );
    } else {
      setTypes(
        types.map((item, i) => {
          if (i === index) {
            return { ...item, checked: false };
          }
          return item;
        })
      );
    }
  }
  const onClear: MouseEventHandler<HTMLButtonElement> = () => {
    setClear(!isClear);
    setTypes(
      types.map((item, i) => {
        return { ...item, checked: false };
      })
    );
    setStatus(
      status.map((item, i) => {
        return { ...item, checked: false };
      })
    );
  };
  useEffect(() => {
    let checkTypes: number[] = [];
    types.forEach((item) => {
      if (item.checked) {
        checkTypes.push(item.value as number);
      }
    });
    props.onFilterTypeChange(checkTypes);
  }, [types]);
  let [x, setx] = useState<string>();
  let [y, sety] = useState<string>();
  const applyHandle = () => {
    props.sideBarCenterApply({ x: Number(x), y: Number(y) });
  };
  const xChangeHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    // check number range TODO
    setx(e.target.value);
  };
  const yChangeHandle: ChangeEventHandler<HTMLInputElement> = (e) => {
    // check number range TODO

    sety(e.target.value);
  };
  const [isClear, setClear] = useState(false);
  return (
    <div className={`mapsidebar z10 ${props.sideClose ? "close" : ""}`}>
      <Button
        type="primary"
        onClick={props.sideCloseHandle}
        className="openclose"
        size={"middle"}
      >
        <LeftOutlined />
      </Button>
      <div className="inner">
        <div className="sec-title">
          <div className="map">map</div>
          <button className="clear" onClick={onClear}>
            clear
          </button>
        </div>
        <div className="hr"></div>
        <ul className="sec-status pt-16 pb-16">
          {status.map((item, index) => (
            <li className="status-item" key={item.name}>
              <Checkbox
                onChange={(e) => {
                  onStatusChange(e, item, index);
                }}
                checked={item.checked}
              >
                {item.name}
              </Checkbox>
            </li>
          ))}
        </ul>
        <div className="hr"></div>
        <div className="sec-title ">
          <div className="tit">Type</div>
        </div>
        <ul className="sec-status pb-16">
          {types.map((item, index) => (
            <li className="status-item" key={item.name}>
              <Checkbox
                onChange={(e) => {
                  onTypeChange(e, item, index);
                }}
                checked={item.checked}
              >
                <span
                  className={`color color${index + 1}`}
                  style={{ background: item.color }}
                ></span>
                {item.name}
              </Checkbox>
            </li>
          ))}
        </ul>
        <div className="hr"></div>
        <div className="sec-title ">
          <div className="tit">Coordinates</div>
        </div>
        <div className="sec-coord">
          <div className="coorditem">
            <span className="dn">X</span>
            <div className="coord-input">
              <Input
                placeholder="X"
                className=""
                type="text"
                autoComplete="off"
                maxLength={4}
                onChange={xChangeHandle}
              />
            </div>
          </div>
          <div className="coorditem">
            <span className="dn">Y</span>
            <div className="coord-input">
              <Input
                placeholder="Y"
                className=""
                type="text"
                autoComplete="off"
                maxLength={4}
                onChange={yChangeHandle}
              />
            </div>
          </div>
        </div>

        <div className="coord-button">
          {/* <button className="clear">Apply</button> */}
          <Button
            type="primary"
            onClick={applyHandle}
            shape="round"
            size={"middle"}
          >
            Apply
          </Button>
        </div>
        <div className="hr"></div>
        <div className="sec-title ">
          <div className="tit">Wallet</div>
        </div>
        <div className="wallet">
          <div className="wallet-input">
            <input
              placeholder="EX: 0x774897ehr08hsj09js0"
              type="text"
              autoComplete="off"
              maxLength={-1}
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MapSideBar;
