import { Color } from "../ColorButton/types";

export type ToolbarProps = {
    color: Color;
    strokes: number[],
    strokeWidth: number;
    setColor: (color: Color) => void;
    setStrokeWidth: (strokeWidth: number) => void;
  };