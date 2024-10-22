export const Colors = ["green", "blue", "purple", "red"] as const;

export type Color = (typeof Colors)[number];

export type ColorButtonProps = {
    color: Color;
    isSelected: boolean;
    onPress: () => void;
};