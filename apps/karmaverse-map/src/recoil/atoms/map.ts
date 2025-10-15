import { atom, DefaultValue, AtomEffect } from "recoil";
// import mapjson from '../../config/map.json';
// const mapData = mapjson as AtlasDataObj; // mapDataState
import { tile7zUrl, tilezipUrl } from "../../config/constants/map";

import { Archive } from "libarchive.js";
Archive.init({
  // workerUrl: 'libarchive.js/dist/worker-bundle.js',
  workerUrl: "public/worker-bundle.js",
});

// import SevenZip from '7z-wasm';

const fetchMap = () => {
  console.log("mapData");
  console.time("map");
  return new Promise<AtlasDataObj>(async (resolve, reject) => {
    try {
      const data = await fetch(tile7zUrl, {
        // mode: 'no-cors',
        headers: {
          "x-client-time": `${Date.now()}`, // vs x-user-date
        },
      });
      const raw = await data.blob();
      // const raw = await data.arrayBuffer();

      // const sevenZip = await SevenZip({});
      // const archiveData = new Uint8Array(100);
      // const archiveName = 'map.7z';

      // const stream = sevenZip.FS.open(archiveName, 'w+');
      // sevenZip.FS.write(stream, archiveData, 0, archiveData.length);
      // sevenZip.FS.close(stream);

      // const filesToExtract = ['map.json'];
      // sevenZip.callMain(['x', archiveName, ...filesToExtract]);
      // console.log(1111, sevenZip.FS.readFile(filesToExtract[0]));

      const archive = await Archive.open(raw as File);
      const obj = await archive.extractFiles();
      console.timeEnd("map");

      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target?.result && typeof event.target.result === "string") {
          const mapDataObj = JSON.parse(event.target.result);
          // console.log(mapDataObj['-200,-200']);
          resolve(mapDataObj);
        }
      };
      reader.readAsText(obj["map.json"] as File);
    } catch (error) {
      console.timeEnd("map");
      console.log(error);
      reject(null);
    }
  });
};

const localForageEffect: AtomEffect<AtlasDataObj> = ({ setSelf, onSet }) => {
  setSelf(
    fetchMap().then((mapData) => {
      return mapData != null ? mapData : new DefaultValue(); // 如果没有存储值，则终止初始化
    })
  );
  onSet((newValue) => {
    console.log(newValue, 345234522222222);
    if (newValue instanceof DefaultValue) {
      // localStorage.removeItem(key);
    } else {
      // localStorage.setItem(key, JSON.stringify(newValue));
    }
  });
};
// mapData x y t
export const mapDataState = atom<AtlasDataObj>({
  key: "mapDataState",
  // default: mapData,
  default: {},
  effects_UNSTABLE: [localForageEffect],
});
