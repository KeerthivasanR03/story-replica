import React, { useState } from "react";
import { Button, View, StyleSheet, PixelRatio } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path as SkiaPath, Skia, makeImageFromView, Image, useImage } from "@shopify/react-native-skia";

const pd = PixelRatio.get();

export default function Draw() {
  const [paths, setPaths] = useState([]);
  const [image, setImage] = useState(null);
  const canvasRef = React.useRef(null);

  const backgroundImage = useImage("https://picsum.photos/200/300");

  const pan = Gesture.Pan()
    .onStart((g) => {
      // Create a new Skia.Path for the new stroke
      const newPath = Skia.Path.Make();
      newPath.moveTo(g.x, g.y);

      // Add the new path to the paths array with its own color
      setPaths((prevPaths) => [
        ...prevPaths,
        { path: newPath, color: "#06d6a0" },
      ]);
    })
    .onUpdate((g) => {
      setPaths((prevPaths) => {
        const updatedPaths = [...prevPaths];
        // Update only the most recent path
        const currentPath = updatedPaths[updatedPaths.length - 1].path;
        currentPath.lineTo(g.x, g.y);
        return updatedPaths;
      });
    })
    .minDistance(1);

  const onPress = async () => {
    // Take the snapshot of the view
    const snapshot = await makeImageFromView(canvasRef);
    setImage(snapshot);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1,  }} ref={canvasRef} collapsable={false}>
            <Canvas style={{ flex: 8 }}>
              {
                backgroundImage && <Image 
                  image={backgroundImage}
                  x={0}
                  y={0}
                  width={1000 / pd}
                  height={1000 / pd}
                />
              }
              {paths.map((p, index) => (
                <SkiaPath
                  key={index}
                  path={p.path}
                  strokeWidth={5}
                  style="stroke"
                  color={p.color}
                />
              ))}
            </Canvas>
          </View>
          {/* <TouchableOpacity>Take screenshot</TouchableOpacity> */}
          <Button onPress={onPress} title="take screenshots hello"></Button>
          <View style={{ flex: 1 }}>
            {
              image && (
                <Canvas style={StyleSheet.absoluteFill}>
                  <Image
                    image={image}
                    x={0}
                    y={0}
                    width={image.width() / pd}
                    height={image.height() / pd}
                  />
                </Canvas>
              )
            }
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}
