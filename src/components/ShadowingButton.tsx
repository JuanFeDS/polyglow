import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import Colors from '@/constants/Colors';

type ShadowingButtonProps = {
  onPress: () => void;
  isActive: boolean;
};

export const ShadowingButton: React.FC<ShadowingButtonProps> = ({ onPress, isActive }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
      
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setIsRecording(false);
    scaleAnim.stopAnimation();
    
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
      // Here you would handle the recorded audio file
    }
  };

  const handlePress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
    onPress();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.button, { transform: [{ scale: scaleAnim }] }]}>
        <TouchableOpacity
          onPress={handlePress}
          style={[
            styles.recordButton,
            isRecording && styles.recordingButton,
          ]}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isRecording ? 'stop' : 'mic'} 
            size={32} 
            color="white" 
          />
        </TouchableOpacity>
      </Animated.View>
      <Text style={styles.label}>
        {isRecording ? 'Stop Recording' : 'Repeat Phrase'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  recordingButton: {
    backgroundColor: Colors.light.secondary,
  },
  label: {
    marginTop: 8,
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: '500',
  },
});
