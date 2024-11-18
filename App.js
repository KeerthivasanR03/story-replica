// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'; // Create a HomeScreen component
import MediaSelectionScreen from './components/MediaSelectionScreen';
import MediaEditingScreen from './components/MediaEditingScreen';
import DescriptionScreen from './components/DescriptionScreen';
import StoryPreview from './components/storyPreview';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MediaSelection" component={MediaSelectionScreen} />
        <Stack.Screen name="MediaEditing" component={MediaEditingScreen} />
        <Stack.Screen name="Description" component={DescriptionScreen} />
        <Stack.Screen name="StoryPreview" component={StoryPreview} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
