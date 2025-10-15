import { landData, landOwnerState } from "@/recoil/atoms/landOwner";
import { useEffect, useState } from "react";
import localforage from "localforage";
import { useRecoilState } from "recoil";
import { landOwnersUrl } from "@/config/constants/map";

const fetchLandOwnersData = () => {
  console.time("map1");
  return new Promise<AtlasDataObj>(async (resolve, reject) => {
    try {
      const data = await fetch(landOwnersUrl, {
        // mode: 'no-cors',
        headers: {
          "x-client-time": `${Date.now()}`, // vs x-user-date
        },
      });
      const res = await data.json();
      let data_: AtlasDataObj = {};
      if (res.status) {
        (res.data as AtlasTile[]).forEach((item) => {
          data_[`${item.x},${item.y}`] = {
            ...landData,
            x: item.x,
            y: item.y,
            top: !!item.top,
            bottom: !!item.bottom,
            left: !!item.left,
            right: !!item.right,
            owner: item.owner,
            ownerImage: item.ownerImage,
            price: item.price,
            wallet: item.wallet,
          };
          localforage.getItem(`${item.x},${item.y}`, function (err, value) {
            console.log(value, 55555);
            !value &&
              localforage
                .setItem(`${item.x},${item.y}`, data_[`${item.x},${item.y}`])
                .then((value) => {
                  // 当值被存储后，可执行其他操作
                  console.log(value);
                })
                .catch((err) => {
                  // 当出错时，此处代码运行
                  // console.log(err);
                });
          });
        });
      }
      resolve(data_);
      console.timeEnd("map1");
    } catch (error) {
      reject({});
    }
  });
};
const useLandOwners = () => {
  const [loading, setLoading] = useState(false);
  const [landOwner, setLandOwner] = useRecoilState(landOwnerState);

  useEffect(() => {
    fetchLandOwnersData().then((res) => {
      console.log(res);
      setLandOwner(res);
    });
  }, []);
  return { loading, landOwner };
};
export default useLandOwners;
