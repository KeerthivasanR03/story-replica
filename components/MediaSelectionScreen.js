// components/MediaSelectionScreen.js
import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MediaSelectionScreen = ({ navigation }) => {
  const [media, setMedia] = useState([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      // You can also set options for maximum selection limit etc.
    });

    if (!result.canceled) {
      setMedia(result.assets);
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
    });

    if (!result.canceled) {
      setMedia([...media, result.assets[0]]);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      <Button title="Capture an image" onPress={captureImage} />

      <ScrollView>
        {media.map((item, index) => (
          // console.log("this is inside media selection screen")
          <Image key={index} source={{ uri: item.uri }} style={styles.image} />
        ))}
      </ScrollView>

      <Button
        title="Next"
        onPress={() => navigation.navigate('MediaEditing', { media })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default MediaSelectionScreen;
