import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import ColorButton from '../ColorButton/ColorButton';
import { Color, Colors } from '../ColorButton/types';
import { ToolbarProps } from './types';

const ToolBar = ({
    color,
    strokes,
    strokeWidth,
    setColor,
    setStrokeWidth,
  }: ToolbarProps) => {
    const [showStrokes, setShowStrokes] = useState(false);
  
    const handleStrokeWidthChange = (stroke: number) => {
      setStrokeWidth(stroke);
      setShowStrokes(false);
    };
  
    const handleChangeColor = (color: Color) => {
      setColor(color);
    };
  
    return (
      <>
        {showStrokes && (
          <View style={[style.toolbar, style.strokeToolbar]}>
            {strokes.map((stroke) => (
              <Pressable
                onPress={() => handleStrokeWidthChange(stroke)}
                key={stroke}
              >
                <Text style={style.strokeOption}>{stroke}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <View style={[style.toolbar]}>
          <Pressable
            style={style.currentStroke}
            onPress={() => setShowStrokes(!showStrokes)}
          >
            <Text>{strokeWidth}</Text>
          </Pressable>
          <View style={style.separator} />
          {Colors.map((item) => (
            <ColorButton
              isSelected={item === color}
              key={item}
              color={item}
              onPress={() => handleChangeColor(item)}
            />
          ))}
        </View>
      </>
    );
  };

export default ToolBar

const style = StyleSheet.create({
    strokeOption: {
        fontSize: 18,
        backgroundColor: "#f7f7f7",
      },
    toolbar: {
      backgroundColor: "#ffffff",
      height: 50,
      width: 300,
      borderRadius: 100,
      borderColor: "#f0f0f0",
      borderWidth: 1,
      flexDirection: "row",
      paddingHorizontal: 12,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
    },
    separator: {
      height: 30,
      borderWidth: 1,
      borderColor: "#f0f0f0",
      marginHorizontal: 10,
    },
    currentStroke: {
      backgroundColor: "#f7f7f7",
      borderRadius: 5,
    },
    strokeToolbar: {
      position: "absolute",
      top: 70,
      justifyContent: "space-between",
      zIndex: 100,
    },
  });