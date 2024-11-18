import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function StoryPreview({ route }) {
  const { integratedUri, audioUri } = route.params;
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Load and play the audio when the component mounts
    const loadSound = async () => {
      if (audioUri) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: audioUri },
          { shouldPlay: true }
        );
        setSound(sound);
      }
    };
    // loadSound();
    console.log(integratedUri)

    // Clean up and unload the audio when the component unmounts
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUri]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {integratedUri && <Image source={{ uri: integratedUri }} style={{ width: 300, height: 300 }} />}
      <Text style={{ marginTop: 20 }}>Your Story Preview</Text>
      <Button title="Post Story" onPress={() => alert('Story posted!')} />
    </View>
  );
}
