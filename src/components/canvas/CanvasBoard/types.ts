import { SkPath } from "@shopify/react-native-skia";
import { Color } from "../ColorButton/types";

export type CanvasBoardProps = {
    width?: number;
    height?: number;
    disableBrush?: boolean;
    color: Color;
    strokeWidth: number;
    opacity: number;
  }

export type PathWithColorAndWidth = {
    path: SkPath;
    color: Color;
    strokeWidth: number;
  };