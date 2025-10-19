import { useState } from 'react';
import { Switch, Upload, Button } from 'antd';
import { SwitchChangeEventHandler } from 'antd/lib/switch';
import './index.less';
export type LandBorderProps = {
  onSubmit: (cfg: { top: boolean; left: boolean }) => void;
  onCancel: () => void;
};
const LandBorder: React.FC<LandBorderProps> = (props) => {
  const [topchecked, setTopchecked] = useState(false);
  const [leftchecked, setLeftchecked] = useState(false);
  const handleBorder = () => {
    props.onSubmit({
      top: topchecked,
      left: leftchecked,
    });
  };

  const onTopSwitchChange: SwitchChangeEventHandler = (val) => {
    setTopchecked(val);
  };
  const onLeftSwitchChange: SwitchChangeEventHandler = (val) => {
    setLeftchecked(val);
  };
  return (
    <div className="bordersetting">
      <div
        className={`landbox ${leftchecked ? 'leftn' : ''} ${
          topchecked ? 'topn' : ''
        }`}
      >
        <div className="boxtop"></div>
        <div className="boxright"></div>
        <div className="boxbottom"></div>
        <div className="boxleft"></div>
        <div className="cover"></div>
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
          <span className="title">Connected with top:</span>
          <Switch
            className="swi"
            checked={topchecked}
            onChange={onTopSwitchChange}
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
