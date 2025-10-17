import { Layout, Menu, Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import type { MenuProps } from "antd";
import { BrowserRouter, NavLink } from "react-router-dom";
import { lazy, Suspense } from "react";
import {
  KarmaverseIcon,
  Karmaverse,
  Home,
  Marketplace,
  Dex,
  Map,
  About,
  Whitepaper,
} from "../svg/svg";
import "./Layout.less";
import Loading from "../Loading";

const { Header, Content, Footer, Sider } = Layout;

// 懒加载路由组件
const Routes = lazy(() => import("../../routes/Routes"));

import { GlobalOutlined } from "@ant-design/icons";
import { RecoilRoot } from "recoil";

const LanSwitch: React.FC = function () {
  const { i18n } = useTranslation();
  return (
    <div className="lanswitch-txt">
      <span>{["zh", "zh-CN"].includes(i18n.language) ? "中文" : "EN"}</span>
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="778"
        width="16"
        height="16"
      >
        <path
          d="M927.804 352.19299999l-415.804 415.63200001-415.803-415.632 63.616-63.445 352.209 352.017 352.102-352.017z"
          p-id="779"
          fill="#fff"
        />
      </svg>
    </div>
  );
};
const App = () => {
  const { i18n } = useTranslation();
  const MenuConf = [
    { name: "Home", value: "Home", link: "/", comp: Home },
    { name: "Marketplace", value: "Marketplace", link: "/", comp: Marketplace },
    { name: "Dex", value: "Karma Dex", link: "/", comp: Dex },
    { name: "Whitepaper", value: "Whitepaper", link: "/", comp: Whitepaper },
    { name: "Map", value: "Map", link: "/map", comp: Map },
    { name: "About", value: "About", link: "/", comp: About },
  ];
  const handleDropMenuClick: MenuProps["onClick"] = (e) => {
    // console.log(e.key, 2222);
    i18n.changeLanguage(e.key);
  };
  const lanMenuItems = [
    { key: 'zh', label: '中文' },
    { key: 'en', label: 'EN' }
  ];
  return (
    <RecoilRoot>
      <BrowserRouter basename="/">
        <Layout className="karmaverse">
          <Header className="header">
            <div className="logo">
              <NavLink to="/">
                <KarmaverseIcon />
                <Karmaverse />
              </NavLink>
            </div>
            <Menu
              theme="dark"
              className="mainmenu"
              mode="horizontal"
              defaultSelectedKeys={["Map"]}
              items={MenuConf.map((item, index) => {
                const Comp = MenuConf[index]["comp"];
                return {
                  key: item.name,
                  label: (
                    <NavLink to={item.link}>
                      <Comp />
                      {item.value}
                    </NavLink>
                  )
                };
              })}
            />

            <Dropdown
              menu={{ items: lanMenuItems, onClick: handleDropMenuClick }}
              arrow={false}
              trigger={["click"]}
              overlayClassName="lanswitch-over"
            >
              <a className="lanswitch-box" onClick={(e) => e.preventDefault()}>
                <GlobalOutlined className="global" />
                <LanSwitch />
              </a>
            </Dropdown>
          </Header>
          <Content style={{ padding: "0" }} className="content">
            <Suspense fallback={<Loading />}>
              <Routes />
            </Suspense>
          </Content>
        </Layout>
      </BrowserRouter>
    </RecoilRoot>
  );
};
export default App;
