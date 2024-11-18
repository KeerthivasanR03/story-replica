import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { ColorMatrix } from "@shopify/react-native-skia";

export default function ToolbarComponent({ setFilter }) {
  // Define ColorMatrix filters
  const filters = {
    original: null,
    grayscale: ColorMatrix({
      matrix: [
        0.33, 0.33, 0.33, 0, 0,
        0.33, 0.33, 0.33, 0, 0,
        0.33, 0.33, 0.33, 0, 0,
        0, 0, 0, 1, 0,
      ]
    }),
    sepia: ColorMatrix({
      matrix: [
        0.393, 0.769, 0.189, 0, 0,
        0.349, 0.686, 0.168, 0, 0,
        0.272, 0.534, 0.131, 0, 0,
        0, 0, 0, 1, 0,
      ]
    }),
    brightness: ColorMatrix({
      matrix: [
        1.2, 0, 0, 0, 0,
        0, 1.2, 0, 0, 0,
        0, 0, 1.2, 0, 0,
        0, 0, 0, 1, 0,
      ]
    }),
  };

  const stickers = [
    { id: 1, src: "https://picsum.photos/200/300" },
    { id: 2, src: "https://picsum.photos/200/300" },
    // Add more sticker sources here
  ];

  return (
    <View>
    <View style={styles.toolbar}>
      {Object.keys(filters).map((key) => (
        <TouchableOpacity
          key={key}
          onPress={() => setFilter(filters[key])}
          style={styles.button}
        >
          <Text style={styles.text}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
    <View style={styles.stickerSection}>
    {stickers.map((sticker) => (
      <TouchableOpacity
        key={sticker.id}
        onPress={() => null}
        style={styles.stickerButton}
      >
        <Image source={sticker.src} style={styles.stickerThumbnail} />
      </TouchableOpacity>
    ))}
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#ddd",
  },
  button: {
    padding: 10,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
});
