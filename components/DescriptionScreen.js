// components/DescriptionScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

const DescriptionScreen = ({ route }) => {
  const { media, description } = route.params;

  const sendStory = () => {
    // Here you would handle the upload to your server or storage
    Alert.alert('Story Sent!', 'Your story has been successfully posted!');
    // Navigate back to home or wherever needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Review</Text>
      {media.map((item, index) => (
        // console.log("this is inside descripton screen")
        <Image key={index} source={{ uri: item.uri }} style={styles.image} />
      ))}
      <Text>Description: {description}</Text>
      <Button title="Send" onPress={sendStory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default DescriptionScreen;
