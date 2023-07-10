import React, { useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import { Stat } from "./Stat";
import { Slide } from "./Slide";
import { styles } from "./styles";

export const Carousel = (props) => {
  const { items, style, itemInterval } = props;
  const itemsPerInterval =
    props.itemsPerInterval === undefined ? 1 : props.itemsPerInterval;

  const [interval, setInterval] = React.useState(1);
  const [intervals, setIntervals] = React.useState(1);
  const [width, setWidth] = React.useState(0);

  useEffect(() => {
    // re-initializing when items (spraywalls) changes
    init(width);
  }, [items]);

  // redundant? improve?
  useEffect(() => {
    // handler function for parent components to access carousel's interval
    itemInterval(interval);
  }, [interval]);

  const init = (width) => {
    // initialize width
    setWidth(width);
    // initialize total intervals
    const totalItems = items.length;
    setIntervals(Math.ceil(totalItems / itemsPerInterval));
  };

  const getInterval = (offset) => {
    for (let i = 1; i <= intervals; i++) {
      const intervalWidth = width / intervals;
      const mid = intervalWidth / 2;
      const offsetMid = mid + intervalWidth * (i - 1);
      if (offset + 1 < offsetMid) {
        return i;
      }
      if (i == intervals) {
        return i;
      }
    }
  };

  let bullets = [];
  for (let i = 1; i <= intervals; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: interval === i ? 1 : 0.2,
        }}
      >
        &bull;
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          ...styles.scrollView,
          width: `${100 * intervals}%`,
        }}
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(w, h) => init(w)}
        onScroll={(data) => {
          setWidth(data.nativeEvent.contentSize.width);
          setInterval(getInterval(data.nativeEvent.contentOffset.x));
        }}
        scrollEventThrottle={25} // every 25 milliseconds onScroll event is called. Could also be lower (which helps improve responsiveness) since we are not doing too many computations
        pagingEnabled
        decelerationRate="fast"
      >
        {items.map((item, index) => {
          switch (style) {
            case "stats":
              return <Stat key={index} label={item.label} value={item.value} />;
            default:
              return <Slide key={index} image={item} />;
          }
        })}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

export default Carousel;
