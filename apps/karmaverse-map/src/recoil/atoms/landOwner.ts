import { atom, DefaultValue, AtomEffect } from 'recoil';
// import mapjson from '../../config/map.json';
// const mapData = mapjson as AtlasDataObj; // mapDataState

// landOwnerCoverBase64State base64 string or url(/api/ownerimage?x=7&y=-66)
// export const landOwnerCoverBase64State = atom<MapDataImgStringObj>({
//   key: 'landOwnerCoverBase64State',
//   default: {},
// });
// save landOwnerImageState Image obj
export const landOwnerImageState = atom<MapDataImgObj>({
  key: 'landOwnerImageState',
  default: {},
});

export const landData: AtlasTile = {
  x: 0,
  y: 0,
  type: 0,
  top: false,
  left: false,
  right: false,
  bottom: false,
  owner: '',
  ownerImage: false,
  wallet: '',
  price: '',
};

// landOwnerState persist?
export const landOwnerState = atom<AtlasDataObj>({
  key: 'landOwnerState',
  default: {},
});

// onSale Premium OpenSea
// onebyone get ownerImage url缓存？
// batch get ownerImage url缓存？
// local sync remote md5? new Date() Date.now()
// https://recoiljs.org/zh-hans/docs/guides/atom-effects/
// https://recoiljs.org/zh-hans/docs/guides/asynchronous-data-queries/
// mapOwnerData x y top left leftTop owner price list ownerImg status
// let mapImgData: MapDataImgObj = {}; //TODO? big object?

// landowner cover image: owner uploaded base64
// ownerCoverBase64State base64 string
// ownerCoverImageSelect Image

// const localForageEffect = key => ({setSelf, onSet}) => {
//   setSelf(localForage.getItem(key).then(savedValue =>
//     savedValue != null
//       ? JSON.parse(savedValue)
//       : new DefaultValue() // 如果没有存储值，则终止初始化
//   ));

//   onSet(newValue => {
//     if (newValue instanceof DefaultValue) {
//       localStorage.removeItem(key);
//     } else {
//       localStorage.setItem(key, JSON.stringify(newValue));
//     }
//   });
// };
// const currentUserIDState = atom({
//   key: 'CurrentUserID',
//   default: 1,
//   effects_UNSTABLE: [
//     localForageEffect('current_user'),
//   ]
// });
