declare module '@karmaverse/kvm-tile-map' {
  export interface Coord {
    x: number;
    y: number;
  }

  export interface Layer {
    (x: number, y: number): any;
  }

  export interface TileMapProps {
    [key: string]: any;
  }

  export interface TileMapLite {
    [key: string]: any;
  }

  export const TileMap: any;
  export const TileMapLite: any;
}
