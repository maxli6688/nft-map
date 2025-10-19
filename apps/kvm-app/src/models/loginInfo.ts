export interface LoginInfo {
  headimgurl: string;
  nickname: string;
  uid: number;
  uuid: number;
  sign?: string;
  auth?: string;
}
// 默认值初始化
export const initLogin = (): LoginInfo => ({
  headimgurl: "",
  nickname: "string",
  uid: 0,
  uuid: 0,
});
