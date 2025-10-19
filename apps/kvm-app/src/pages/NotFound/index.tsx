import React, { FC } from 'react';
import './NotFound.less';
import { Result } from 'antd';

const NotFound: FC = function () {
  // let page404 = () => {
  //   let script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js`;
  //   script.setAttribute("homePageUrl", "/");
  //   script.setAttribute("homePageName", "返回首页");
  //   document.getElementsByTagName("head")[0].appendChild(script);
  // };
  // page404();
  return (
    <div className="page page-404">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        // extra={<Button type="primary">Back Home</Button>}
      />
    </div>
  );
};
export default NotFound;
