import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, List, Breadcrumb, Pagination, Empty } from "antd";
import { getLands } from "../../api/tile";
import "./index.less";
// import { useViewport } from "@/hooks";
import { API_BASE_URL, mapTypeObj } from "@/config/constants/map";
import { useRecoilValue } from "recoil";
import { mapDataState } from "@/recoil/atoms/map";

const { Meta } = Card;
type IAtlasTileList = Partial<AtlasTile>[];

// 懒加载大型组件
const LandsListContent: React.FC<{
  lands: IAtlasTileList;
  mapData: any;
  t: any;
}> = React.memo(({ lands, mapData, t }) => {
  if (!lands.length) {
    return <Empty description={t("nodata")} />;
  }

  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={lands}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src={`${API_BASE_URL}/api/landimage?x=${item.x}&y=${item.y}`}
              />
            }
          >
            <Meta
              title={`${item.x},${item.y}`}
              description={`${
                mapTypeObj[
                  mapData[`${item.x},${item.y}`][
                    "type"
                  ]! as keyof typeof mapTypeObj
                ]
              }`}
            />
          </Card>
        </List.Item>
      )}
    />
  );
});

// 没有切换语言选项
const LandsList: FC = function () {
  const mapData = useRecoilValue(mapDataState);
  const { t, i18n } = useTranslation();
  const [lands, setLands] = useState<IAtlasTileList>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getLandsHandle = () => {
    const pa = { page, pageSize: 10 };
    console.log(pa, 111111);
    getLands(pa)
      .then((res) => {
        console.log("getLands ", res.data);
        if (res.status === 1) {
          setTotalPage(res.data.total as number);
          setLands(res.data.lists as IAtlasTileList);
        }
      })
      .catch((err) => {
        console.log("getFilterLands err ", err);
      });
  };

  useEffect(() => {
    getLandsHandle();
  }, [page]);

  return (
    <div className="page page-lands-list">
      <section className="section lands-box">
        <div className="inner">
          <article>
            <Card className="lands-list">
              <LandsListContent lands={lands} mapData={mapData} t={t} />
              <div className="p-16 mb-16 text-center">
                <Pagination
                  defaultCurrent={page}
                  total={totalPage}
                  onChange={(page) => {
                    setPage(page);
                  }}
                />
              </div>
            </Card>
          </article>
        </div>
      </section>
    </div>
  );
};

export default LandsList;
