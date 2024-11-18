import React, { useState } from 'react'
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av'

const AudioPlayer = ({audioFile}) => {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Function to play audio
    const playAudio = async () => {
        if (audioFile && !sound) {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audioFile?.uri },
                { shouldPlay: true }
            );
            setSound(sound);
            setIsPlaying(true);

            // Set an event listener to reset when playback finishes
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish) {
                    resetAudio();
                }
            });
        } else if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    // Function to pause audio
    const pauseAudio = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    // Function to stop audio
    const stopAudio = async () => {
        if (sound) {
            await sound.stopAsync();
            setIsPlaying(false);
        }
    };

    // Function to reset audio state
    const resetAudio = async () => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
            setIsPlaying(false);
        }
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{display: "flex", flexDirection: "row"}}>
                <Button title="Play" onPress={playAudio}>
                </Button>
                <Button title="Pause" onPress={pauseAudio} />
                <Button title="Stop" onPress={stopAudio} />
            </View>
        </View>
    )
}

export default AudioPlayer