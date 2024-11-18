// HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to StoryApp</Text>
      <Button title="Add a Story" onPress={() => navigation.navigate('MediaSelection')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default HomeScreen;

// import React, { useState, useRef } from "react";
// import { View, Button, StyleSheet } from "react-native";
// import { Canvas, Path, Skia, useTouchHandler, Image as SkiaImage, DrawingInfo, IPath } from "@shopify/react-native-skia";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";


// const ScribbleOnImage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [image, setImage] = useState(null);
//   const paths = useRef([]);  // Store paths for drawing

//   // Handle drawing on the canvas
//   const touchHandler = useTouchHandler({
//     onStart: (pt) => {
//       const newPath = Skia.Path.Make();
//       newPath.moveTo(pt.x, pt.y);
//       paths.current.push(newPath);
//     },
//     onActive: (pt) => {
//       const currentPath = paths.current[paths.current.length - 1];
//       if (currentPath) {
//         currentPath.lineTo(pt.x, pt.y);
//       }
//     },
//   });

//   // Select an image
//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);

//       const fileUri = result.assets[0].uri;
//       try {
//         // Read the image data as a Base64 string
//         const base64ImageData = await FileSystem.readAsStringAsync(fileUri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });

//         // Convert Base64 string to Skia-compatible data
//         const skiaImageData = Skia.Data.fromBase64(base64ImageData);
//         const skiaImage = Skia.Image.MakeImageFromEncoded(skiaImageData);
//         setImage(skiaImage);
//       } catch (error) {
//         console.error("Error loading Skia image:", error);
//       }
//     }
//   };

//   // Take a screenshot of the canvas
//   const takeScreenshot = async () => {
//     const snapshot = await FileSystem.takeSnapshotAsync(canvasRef.current, {
//       format: "png",
//       quality: 1,
//       result: "file",
//     });
//     alert(`Screenshot saved to: ${snapshot}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Select Image" onPress={pickImage} />
//       {selectedImage && (
//         <Canvas style={styles.canvas} onTouch={touchHandler}>
//           <SkiaImage image={image} x={0} y={0} width={300} height={300} />
//           {paths.current.map((path, index) => (
//             <Path key={index} path={path} color="black" strokeWidth={4} />
//           ))}
//         </Canvas>
//       )}
//       <Button title="Take Screenshot" onPress={takeScreenshot} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   canvas: {
//     width: 300,
//     height: 300,
//     borderColor: "black",
//     borderWidth: 1,
//     marginTop: 10,
//   },
// });

// export default ScribbleOnImage;

// import React, { useEffect, useState } from "react";
// import { Button, View, StyleSheet, PixelRatio } from "react-native";
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from "react-native-gesture-handler";
// import { Canvas, Path as SkiaPath, Skia, makeImageFromView, Image, useImage, ColorMatrix } from "@shopify/react-native-skia";
// import ToolbarComponent from "./components/ToolbarComponent";

// const pd = PixelRatio.get();

// function Draw() {
//   const [paths, setPaths] = useState([]);
//   const [image, setImage] = useState(null);
//   const [filter, setFilter] = useState(null);
//   const canvasRef = React.useRef(null);

//   const backgroundImage = useImage("https://picsum.photos/200/300");

//   const pan = Gesture.Pan()
//     .onStart((g) => {
//       // Create a new Skia.Path for the new stroke
//       const newPath = Skia.Path.Make();
//       newPath.moveTo(g.x, g.y);

//       // Add the new path to the paths array with its own color
//       setPaths((prevPaths) => [
//         ...prevPaths,
//         { path: newPath, color: "#06d6a0" },
//       ]);
//     })
//     .onUpdate((g) => {
//       setPaths((prevPaths) => {
//         const updatedPaths = [...prevPaths];
//         // Update only the most recent path
//         const currentPath = updatedPaths[updatedPaths.length - 1].path;
//         currentPath.lineTo(g.x, g.y);
//         return updatedPaths;
//       });
//     })
//     .minDistance(1);

//   const onPress = async () => {
//     // Take the snapshot of the view
//     const snapshot = await makeImageFromView(canvasRef);
//     setImage(snapshot);
//   };

//   useEffect(()=>{
//     if(filter){
//       console.log(filter)
//     }
//   }, [filter])

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <GestureDetector gesture={pan}>
//         <View style={{ flex: 1 }}>
//           <View style={{ flex: 1,  }} ref={canvasRef} collapsable={false}>
//             <Canvas style={{ flex: 8 }}>
//               {
//                 backgroundImage && <Image 
//                   image={backgroundImage}
//                   x={0}
//                   y={0}
//                   width={1000 / pd}
//                   height={1000 / pd}
//                   colorFilter={filter}
//                 >
//                   {filter ? filter: ''}
//                 </Image>
//               }
//               {paths.map((p, index) => (
//                 <SkiaPath
//                   key={index}
//                   path={p.path}
//                   strokeWidth={5}
//                   style="stroke"
//                   color={p.color}
//                 />
//               ))}
//             </Canvas>
//           </View>
//           {/* <TouchableOpacity>Take screenshot</TouchableOpacity> */}
//           <Button onPress={onPress} title="take screenshots hello"></Button>
//           <View style={{ flex: 1 }}>
//             {
//               image && (
//                 <Canvas style={StyleSheet.absoluteFill}>
//                   <Image
//                     image={image}
//                     x={0}
//                     y={0}
//                     width={image.width() / pd}
//                     height={image.height() / pd}
//                   />
//                 </Canvas>
//               )
//             }
//           </View>
//           <ToolbarComponent setFilter={setFilter} />
//         </View>
//       </GestureDetector>
//     </GestureHandlerRootView>
//   );
// }
