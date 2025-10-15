import React, { FC, ReactNode, useState, useEffect } from 'react';
import './totast.css';

type ITotast = {
  children?: ReactNode;
  visible: boolean;
  msg?: string;
};

const Totast: FC<ITotast> = function ({
  visible = false,
  msg = '服务开小差了',
}) {
  const [isShow, setIsShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      {visible && isShow ? (
        <div className="modal">
          <div className="tip-msg">{msg}</div>
        </div>
      ) : null}
    </>
  );
};

export default React.memo(Totast);
