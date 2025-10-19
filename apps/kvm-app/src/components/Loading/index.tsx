import './index.less';
import React, { FC, ReactNode } from 'react';

type props = {
  children?: ReactNode;
  bgOpacity?: boolean;
};
const Loading: FC<props> = function ({ bgOpacity = true }) {
  return (
    <div
      className={`components-loading ${
        bgOpacity ? 'components-loading-opacity' : ''
      }`}
    >
      <div className="loading-con">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};

export default Loading;
