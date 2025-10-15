import { http } from '../utils/index';
// type IImageList = {
//   list: { image: string; sort: number }[];
// };
export type IPageParams = {
  // uid: number;
  page?: number;
  pageSize?: number;
};
export function getTile(param: Record<string, string>) {
  return http.get(`/api/tile`, { ...param });
}
export function updateLandOwner(
  param: Record<string, string | number | boolean>
) {
  return http.post(`/api/landowner`, { ...param });
}
//item by x,y
export function getLandOwner(param: Record<string, string | number>) {
  return http.get(`/api/landowner`, { ...param });
}
// list by range or all
export function getLandOwners(param: Record<string, string>) {
  return http.get(`/api/landowners`, { ...param });
}
// list all
export function getLands(param: IPageParams) {
  return http.get(`/api/lands`, { ...param });
}
// export function updateThumbImage(param: IImageList) {
//   return http.post('/api/update-thumbimg', { ...param });
// }
