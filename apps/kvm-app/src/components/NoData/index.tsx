import './index.less';
import React, { FC, ReactNode } from 'react';

type props = {
  children?: ReactNode;
  bgOpacity?: boolean;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Loading: FC<props> = function ({ bgOpacity = true }) {
  return (
    <div className="no-data">
      暂无数据
      <div className="empty" />
    </div>
  );
};

export default Loading;
