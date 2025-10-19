/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.json" {
  const value: any;
  export default value;
}
type AtlasTile = {
  x: number;
  y: number;
  type: number;
  r?: boolean;
  color?: string;
  border?: string;
  estate_id?: number;
  left?: boolean;
  top?: boolean;
  right?: boolean;
  bottom?: boolean;
  // topLeft?: boolean;
  owner?: string;
  price?: string;
  wallet?: string;
  image?: string; // render image = ownerImage ? ownerImage : landDefaultCoverImage
  ownerImage?: boolean; // use api/ownerimage?x=xx&y=xx getImage
};
type HoverTile = {
  x: number;
  y: number;
  top: number;
  left: number;
  visible: boolean;
};
type AtlasDataObj = Record<string, AtlasTile>;
type MapDataImgObj = Record<string, HTMLImageElement | null>;
type MapDataImgStringObj = Record<string, string | null>;
type fileResponse = {
  status: number;
  data: {
    host: string;
    file: {
      key: string;
      location: string;
    };
  };
};
