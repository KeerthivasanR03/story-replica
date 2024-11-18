
// import React, { useRef, useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ImageBackground, Dimensions, Button, FlatList, TouchableOpacity, Image, PanResponder, TextInput } from 'react-native';
// import Slider from '@react-native-community/slider'
// import { useNavigation } from '@react-navigation/native';
// import { captureRef } from 'react-native-view-shot'
// import Canvas from 'react-native-canvas';
// import * as MediaLibrary from 'expo-media-library';
// import AudioPicker from './audioPicker';
// import AudioPlayer from './audioPlayer';


// export default function MediaEditingScreen({ route }) {
//   const [ status, requestPermission] = MediaLibrary.usePermissions()
//   const { media } = route.params;
//   const [imageUri, setImageUri] = useState(media[0]);
//   const [audioFile, setAudioFile] = useState(null);
//   const [color, setColor] = useState('#FF5733');
//   const [lineWidth, setLineWidth] = useState(5);
//   const [signature, setSignature] = useState(null);
//   const viewRef = useRef(null)
//   const [integratedUri, setIntegratedUri] = useState(null);

//   if (status === null) {
//     requestPermission();
//   }

//   const navigation = useNavigation()
//   const colorRef = useRef('#FF5733');
//   const lineWidthRef = useRef(5);
//   const drawingRef = useRef(false);
//   const canvasRef = useRef(null);
//   const contextRef = useRef(null);

//   const [overlayText, setOverlayText] = useState('');
//   const [isTextInputVisible, setIsTextInputVisible] = useState(false); // Control visibility of text input
//   const [textSize, setTextSize] = useState(20); // Size of the text
//   const [isTextBoxActive, setIsTextBoxActive] = useState(false);
//   const textPosition = useRef({ x: 50, y: 50 }); // Default position
//   const [textPositionState, setTextPositionState] = useState({ x: 50, y: 50 }); // For updating the UI only on release

//   const captureView = async () => {
//     try {
//       const localUri = await captureRef(viewRef, {
//         height: 440,
//         quality: 1,
//       });

//       // await MediaLibrary.saveToLibraryAsync(localUri);
//       if (localUri) {
//         alert('Saved!');
//         setIntegratedUri(localUri);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   // PanResponder for dragging the text
//   const texPanResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         // Activate drag
//         textPosition.current = { ...textPosition.current };
//       },
//       onPanResponderMove: (e, gestureState) => {
//         // Update position ref as the user drags
//         textPosition.current = {
//           x: textPositionState.x + gestureState.dx,
//           y: textPositionState.y + gestureState.dy,
//         };
//         setTextPositionState(textPosition.current); // Update for UI feedback
//       },
//       onPanResponderRelease: () => {
//         // Finalize position on release
//         setTextPositionState(textPosition.current);
//       },
//     })
//   ).current;

//   const drawOnCanvas = (ctx) => {
//     if (ctx) {

//       ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous drawings
//       ctx.font = "20px Arial";
//       ctx.fillText(text, 50, 50); // Draw the text
//     }
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext("2d");
//     drawOnCanvas(ctx);
//   }, [imageUri, signature, overlayText, isTextInputVisible, textPosition, isTextBoxActive]);

//   // This function will be called when canvas is ready
//   const handleCanvas = (canvas) => {
//     console.log(canvas)
//     if (canvas) {
//       const context = canvas.getContext('2d');
//       if (context) {
//         canvas.width = 300;
//         canvas.height = 300;
//         context.strokeStyle = colorRef.current;
//         context.lineWidth = lineWidthRef.current;
//         context.lineJoin = 'round';
//         context.lineCap = 'round';
//         contextRef.current = context;
//       } else {
//         console.error("Failed to get canvas context");
//       }
//     }
//   };

//   // Start drawing on the canvas
//   const handleStartDrawing = (x, y) => {
//     if (contextRef.current) {
//       contextRef.current.moveTo(x, y);
//       contextRef.current.beginPath();
//       drawingRef.current = true;
//     }
//   };

//   // Handle drawing while moving finger
//   const handleDraw = (x, y) => {
//     if (drawingRef.current && contextRef.current) {
//       contextRef.current.lineTo(x, y);
//       contextRef.current.stroke();
//     }
//   };

//   const handleStopDrawing = () => {
//     if (drawingRef.current && contextRef.current) {
//       contextRef.current.closePath();
//       drawingRef.current = false;
//     }
//   };
//   // Pan responder to track touch gestures
//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderGrant: (evt) => handleStartDrawing(evt.nativeEvent.locationX, evt.nativeEvent.locationY),
//     onPanResponderMove: (evt) => handleDraw(evt.nativeEvent.locationX, evt.nativeEvent.locationY),
//     onPanResponderRelease: handleStopDrawing,
//   });

//   // Clear the canvas
//   const handleClear = () => {
//     if (contextRef.current) {
//       contextRef.current.clearRect(0, 0, contextRef.current.canvas.width, contextRef.current.canvas.height);
//     }
//   };

//   const handleColorChange = (newColor) => {
//     colorRef.current = newColor;
//     if (contextRef.current) contextRef.current.strokeStyle = newColor;
//   };

//   const handleLineWidthChange = (width) => {
//     lineWidthRef.current = width;
//     if (contextRef.current) contextRef.current.lineWidth = width;
//   };

//   const handleSignature = (signature) => {
//     setSignature(signature); // Save the signature as an image or data URI
//   };

//   // const handleClear = () => {
//   //   signatureRef.current.clear();
//   // };


//   // Handle Text Input visibility and text update
//   const handleTextInputToggle = () => {
//     setIsTextInputVisible(!isTextInputVisible);
//   };

//   const handleTextChange = (text) => {
//     setOverlayText(text);
//   };

//   // Handle Text Box Dragging (Position Update)
//   const handleTextBoxMove = (e) => {
//     if (isTextBoxActive) {
//       const touchX = e.nativeEvent.locationX;
//       const touchY = e.nativeEvent.locationY;
//       setTextPosition({ x: touchX, y: touchY });
//     }
//   };

//   // Handle Text Box Activation and Deactivation
//   const handleTextBoxActivate = () => {
//     setIsTextBoxActive(true);
//   };

//   const handleTextBoxDeactivate = () => {
//     setIsTextBoxActive(false);
//   };

//   useEffect(() => {
//     if (integratedUri) {
//       navigation.navigate('StoryPreview', {
//         integratedUri,
//         audioUri: audioFile?.uri
//       })
//     }
//   }, [integratedUri])

//   const goToPreview = () => {
//     captureView();

//     // setTimeout(() => {
//     //   navigation.navigate('StoryPreview', {
//     //     integratedUri,
//     //     audioUri: audioFile?.uri,

//     //   });
//     // }, 5000); // Wait for the image to load before capturing the view

//   };
//   return (
//     <View style={styles.container}>
//       {/* Image with Text Overlay */}
//       <View ref={viewRef} collapsable={false}>
//         <ImageBackground
//           source={{ uri: imageUri.uri }} // Replace with your image URL
//           style={styles.imageBackground}

//         >

//         <View style={styles.overlayContainer}>
//             <Text style={styles.overlayText}>Overlay Text on Image</Text>
//           </View>
//         <View
//             style={[
//               styles.textBox,
//               {
//                 top: textPositionState.y,
//                 left: textPositionState.x,
//               },
//             ]}
//             {...panResponder.panHandlers}
//           >
//             <Text style={{ fontSize: textSize, fontWeight: 'bold' }}>{overlayText}</Text>
//           </View>

//           <View style={styles.canvasContainer} {...panResponder.panHandlers}>
//             <Canvas  ref={handleCanvas} />
//             </View>
//         </ImageBackground>
//       </View>
//       <AudioPicker audioFile={audioFile} setAudioFile={setAudioFile} />
//       <AudioPlayer audioFile={audioFile} />

//       {/* <Button title="Change Color" onPress={() => handleColorChange('#3498db')} />
//       <Slider
//         minimumValue={1}
//         maximumValue={10}
//         value={lineWidthRef.current}
//         onValueChange={handleLineWidthChange}
//       /> */}

//       {/* Button to toggle text input */}
//       {/* <View style={styles.buttonContainer}>
//         <Button title="Edit Text" onPress={handleTextInputToggle} />
//       </View> */}

//       {/* Text Input Field */}
//       {isTextInputVisible && (
//         <View style={styles.textInputContainer}>
//           <TextInput
//             style={styles.textInput}
//             placeholder="Enter text here"
//             value={overlayText}
//             onChangeText={handleTextChange}
//           />
//           <Button title="Add Text" onPress={handleTextInputToggle} />
//         </View>
//       )}

//       <Button title='preview' onPress={goToPreview} />
//       {/* 
//       <FlatList
//         data={media}
//         horizontal
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => setImageUri(item)}>
//             <Image source={{ uri: item.uri }} style={styles.thumbnail} />
//           </TouchableOpacity>
//         )}
//         style={styles.carousel}
//         showsHorizontalScrollIndicator={false}
//       /> */}

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },

//   imagecontainer: {
//     flex: 1,
//     position: 'relative',
//   },
//   backgroundImage: {
//     ...StyleSheet.absoluteFillObject, // Covers the entire container
//     width: '100%',
//     height: '100%',
//   },
//   overlayContainer: {
//     position: 'absolute',
//     top: 50, // Adjust as needed
//     left: 20, // Adjust as needed
//     backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for better readability
//     padding: 10,
//     borderRadius: 5,
//   },
//   overlayText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   textBox: {
//     position: 'absolute',
//   },
//   canvasContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   imageBackground: {
//     width: '100%',
//     height: '70%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   overlayContainer: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//   },
//   overlayText: {
//     fontSize: 18,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   textBox: {
//     position: 'absolute',
//     backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly transparent background for better visibility
//     padding: 10,
//     borderRadius: 5,
//     minWidth: 100,
//     maxWidth: '80%',
//   },
//   buttonContainer: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   textInputContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   textInput: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     width: '80%',
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//   },
//   text: {
//     fontSize: 18,
//     color: '#ffffff',
//     fontWeight: 'bold',
//   },
//   canvasContainer: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   signatureInfo: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   carousel: {
//     marginTop: 20,
//   },
//   thumbnail: {
//     width: 60,
//     height: 60,
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
// });


import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Button, TextInput, PanResponder, PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import AudioPicker from './audioPicker';
import AudioPlayer from './audioPlayer';
import { Canvas, Path as SkiaPath, Skia, makeImageFromView, Image, useImage, ColorMatrix } from "@shopify/react-native-skia";
import ToolbarComponent from "./ToolbarComponent";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function MediaEditingScreen({ route }) {
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const { media } = route.params;
  const [imageUri, setImageUri] = useState(media[0]);
  const [integratedUri, setIntegratedUri] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const pd = PixelRatio.get();

  const [paths, setPaths] = useState([]);
  const [image, setImage] = useState(null);
  const [filter, setFilter] = useState(null);
  const canvasRef = React.useRef(null);

  const navigation = useNavigation();

  const backgroundImage = useImage(imageUri.uri)
  // const backgroundImage = useImage("https://picsum.photos/200/300");

  console.log(imageUri)

  if (status === null) requestPermission();

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

  useEffect(() => {
    if (filter) {
      console.log(filter)
    }
  }, [filter])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <View style={styles.container}>
          <View style={{ flex: 1, height: 400 }}>
            <View style={{ flex: 1, }} ref={canvasRef} collapsable={false}>
              <Canvas style={{ flex: 8 }}>
                {
                  backgroundImage && <Image
                    image={backgroundImage}
                    x={0}
                    y={0}
                    width={1000 / pd}
                    height={1000 / pd}
                    colorFilter={filter}
                  >
                    {filter ? filter : ''}
                  </Image>
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
            <ToolbarComponent setFilter={setFilter} />
          </View>
          {/* <AudioPicker audioFile={audioFile} setAudioFile={setAudioFile} />
          <AudioPlayer audioFile={audioFile} /> */}
          {/* <Button title="Preview" onPress={goToPreview} /> */}
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageBackground: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  overlayText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textBox: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    maxWidth: '80%',
  },
  canvasContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  textInputContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});




