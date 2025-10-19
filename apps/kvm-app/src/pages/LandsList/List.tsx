import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import "./List.less";
import { Divider, Descriptions } from "antd";
// import { useTranslation } from 'react-i18next';

interface CareersProps {
  lands: Partial<AtlasTile>[];
}
const MainCareersList: FC<CareersProps> = function (props) {
  // const { t } = useTranslation();
  return (
    <ul className="main-lands-list mb-16">
      {props.lands.map((item) => (
        <li key={`${item.x},${item.y}`} className="main-lands-item">
          <NavLink to={`/map?x=${`${item.x}&y=${item.y}`}`}>
            <div className="item">
              <Descriptions size="small" column={1}>
                <Descriptions.Item className="title">
                  {`${item.x},${item.y}`}
                </Descriptions.Item>
                <Descriptions.Item className="subinfo">
                  <span className="capitalize">{item?.owner}</span>
                  <em className="split" /> {item.price}
                </Descriptions.Item>
                <Descriptions.Item
                  contentStyle={{
                    display: "inline-block",
                    width: "100%",
                    textAlign: "right",
                  }}
                >
                  <span className="capitalize">{item.type}</span>
                  {/* <em className="split" />
                  <span className="capitalize">{item.status}</span> */}
                  {/* {t('PublishedAt')}
                  <span className="ml-4 mr-4">:</span>
                  {dayjs(item.publishedAt).format('YYYY-MM-DD')} */}
                </Descriptions.Item>
              </Descriptions>
              <Divider className="divi" />
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default MainCareersList;
