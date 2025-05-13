import { SkPath } from "@shopify/react-native-skia";
import { Color } from "../ColorButton/types";

export type CanvasBoardProps = {
  width?: number;
  height?: number;
  enabled?: boolean;
  color: Color;
  strokeWidth: number;
};

export type PathObj = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
};

export type Point = {
  x: number;
  y: number;
};

type LocalFile = {
  uri: string;
  width: number;
  height: number;
};

export type RefProps = {
  clearCanvas: () => void;
  getPaths: () => PathObj[];
  undo: () => void;
  saveDrawingLocally: () => Promise<LocalFile | undefined>;
};
