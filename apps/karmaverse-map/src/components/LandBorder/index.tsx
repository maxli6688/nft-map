import { useState } from 'react';
import { Switch, Upload, Button } from 'antd';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import './index.less';
export type LandBorderProps = {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
  onSubmit: (cfg: {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  }) => void;
  onCancel: () => void;
};
const LandBorder: React.FC<LandBorderProps> = (props) => {
  const [topchecked, setTopchecked] = useState(false);
  const [bottomchecked, setBottomchecked] = useState(false);
  const [leftchecked, setLeftchecked] = useState(false);
  const [rightchecked, setRightchecked] = useState(false);
  const handleBorder = () => {
    props.onSubmit({
      top: topchecked,
      left: leftchecked,
      right: rightchecked,
      bottom: bottomchecked,
    });
  };

  const onTopSwitchChange: SwitchChangeEventHandler = (val) => {
    setTopchecked(val);
  };
  const onBottomSwitchChange: SwitchChangeEventHandler = (val) => {
    setBottomchecked(val);
  };
  const onLeftSwitchChange: SwitchChangeEventHandler = (val) => {
    setLeftchecked(val);
  };
  const onRightSwitchChange: SwitchChangeEventHandler = (val) => {
    setRightchecked(val);
  };
  return (
    <div className="bordersetting">
      <div
        className={`landbox ${leftchecked ? 'leftn' : ''} ${
          rightchecked ? 'rightn' : ''
        } ${topchecked ? 'topn' : ''} ${bottomchecked ? 'bottomn' : ''}`}
      >
        <div className="boxtop"></div>
        <div className="boxright"></div>
        <div className="boxbottom"></div>
        <div className="boxleft"></div>
        <div className="cover"></div>
      </div>

      <div className="setting-row">
        <div className="row w50">
          <span className="title">Connected with top:</span>
          <Switch
            className="swi"
            checked={topchecked}
            onChange={onTopSwitchChange}
          />
        </div>
        <div className="row w50">
          <span className="title">Connected with bottom:</span>
          <Switch
            className="swi"
            checked={bottomchecked}
            onChange={onBottomSwitchChange}
          />
        </div>
      </div>
      <div className="setting-row">
        <div className="row w50">
          <span className="title">Connected with left:</span>
          <Switch
            className="swi"
            checked={leftchecked}
            onChange={onLeftSwitchChange}
          />
        </div>
        <div className="row w50">
          <span className="title">Connected with right:</span>
          <Switch
            className="swi"
            checked={rightchecked}
            onChange={onRightSwitchChange}
          />
        </div>
      </div>
      <div className="footer">
        <div className="btn-group">
          <Button className="mbtn mr-8" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button className="mbtn" type="primary" onClick={handleBorder}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandBorder;
