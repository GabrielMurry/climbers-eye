import { View, StyleSheet, SafeAreaView } from "react-native";
import React, { useRef, useState } from "react";
import ToolBar from "../../components/boulder/paint/ToolBar";
import ImageCanvas from "../../components/boulder/paint/ImageCanvas";
import { BoulderStackParamList } from "../../navigation/BoulderStack";
import { RefProps } from "../../components/canvas/CanvasBoard/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Color } from "../../components/canvas/ColorButton/types";
import EditBoulderHeader from "../../components/boulder/paint/EditBoulderHeader";

type EditBoulderScreenProps = NativeStackScreenProps<
  BoulderStackParamList,
  "EditBoulder"
>;

const EditBoulderScreen: React.FC<EditBoulderScreenProps> = ({ route }) => {
  const { image } = route.params;

  const canvasRef = useRef<RefProps>(null);

  const [selectedColor, setSelectedColor] = useState<Color>("green");
  const [strokeWidth, setStrokeWidth] = useState(20);
  const [canMove, setCanMove] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <EditBoulderHeader canvasRef={canvasRef} wallImage={image} />
        <ImageCanvas
          selectedColor={selectedColor}
          image={image}
          strokeWidth={strokeWidth}
          canMove={canMove}
          canvasRef={canvasRef}
        />
      </SafeAreaView>
      <ToolBar
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        strokeWidth={strokeWidth}
        setStrokeWidth={setStrokeWidth}
        canMove={canMove}
        setCanMove={setCanMove}
        canvasRef={canvasRef}
      />
    </View>
  );
};

export default EditBoulderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(23,23,23,255)",
  },
});
