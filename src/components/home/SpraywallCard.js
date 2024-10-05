import { View, Pressable, Image } from "react-native";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../utils/styles";
import { setSpraywallIndex } from "../../redux/features/spraywall/spraywallSlice";

const SpraywallCard = ({ spraywall, index, highlight }) => {
  const dispatch = useDispatch();
  const { spraywallIndex } = useSelector((state) => state.spraywall);

  return (
    <Pressable
      style={{
        height: "100%",
        aspectRatio: 1,
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
      key={spraywall.id}
      onPress={() => dispatch(setSpraywallIndex(index))}
    >
      <View
        style={{
          height: "110%",
          aspectRatio: 1,
          position: "absolute",
          borderRadius: 2,
          backgroundColor: colors.primaryLight,
          borderWidth: highlight ? 2 : 0,
          borderColor:
            highlight && index === spraywallIndex
              ? colors.primary
              : colors.primaryLight,
        }}
      />
      <Image
        source={{ uri: spraywall.url }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 2,
          opacity: !highlight ? 1 : index === spraywallIndex ? 1 : 0.8,
        }}
      />
    </Pressable>
  );
};

// If both the image id and url are the same between prevProps and nextProps, the function returns true, which tells React.memo that the SpraywallCard component should not re-render.
// If either the image id or url changes, the function returns false, and the SpraywallCard will re-render to reflect the updated props.
export default memo(
  SpraywallCard,
  (prevProps, nextProps) =>
    prevProps.spraywall.id === nextProps.spraywall.id &&
    prevProps.spraywall.url === nextProps.spraywall.url
);
