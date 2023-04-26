import React from "react";
import Canvas from "react-native-canvas";

const TestDrawScreen = () => {
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, 100, 100);
  };

  return <Canvas ref={this.handleCanvas} />;
};

export default TestDrawScreen;
