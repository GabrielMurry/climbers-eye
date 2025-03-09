import { SkPath } from "@shopify/react-native-skia";
import { Color } from "../ColorButton/types";

export type CanvasBoardProps = {
  width?: number;
  height?: number;
  enabled?: boolean;
  color: Color;
  strokeWidth: number;
  opacity: number;
};

export type PathWithColorAndWidth = {
  path: SkPath;
  color: Color;
  strokeWidth: number;
};

type LocalFile = {
  uri: string;
  width: number;
  height: number;
};

export type RefProps = {
  clearCanvas: () => void;
  getPaths: () => PathWithColorAndWidth[];
  undo: () => void;
  saveAsBase64: () => Promise<string | undefined>;
  saveAsLocalFile: () => Promise<LocalFile | undefined>;
};
