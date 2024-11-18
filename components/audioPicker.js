import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function AudioPicker({
    audioFile, setAudioFile
}) {
//   const [audioFile, setAudioFile] = useState(null);

  useEffect(()=>{
    console.log(audioFile)
  }, [audioFile, setAudioFile])

  // Function to pick an audio file
  const pickAudio = async () => {
    try {
      // Open the document picker for audio files
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*', // Filter to show only audio files
      });

      if (result.canceled === false) {
        setAudioFile(result.assets[0]);
      }
    } catch (err) {
      console.error("Error picking document: ", err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Select Audio" onPress={pickAudio} />
      {audioFile && (
        <Text style={{ marginTop: 20 }}>
          Selected Audio: {audioFile.name} - {audioFile.size} bytes
        </Text>
      )}
    </View>
  );
}
