import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { VideoDimensions } from '../types/video.types';
import Colors from '@/constants/Colors';

interface VideoPlayerProps {
  videoUrl: string;
  isPlaying: boolean;
  onPlayPause: () => void;
  onLoadStart: () => void;
  onLoadEnd: () => void;
  onError: () => void;
  dimensions: VideoDimensions;
}

export const VideoPlayer = ({
  videoUrl,
  isPlaying,
  onPlayPause,
  onLoadStart,
  onLoadEnd,
  onError,
  dimensions,
}: VideoPlayerProps) => {
  const webViewRef = useRef<WebView>(null);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    if (webViewRef.current) {
      const playPauseCommand = isPlaying 
        ? 'document.getElementsByTagName("video")[0].play();' 
        : 'document.getElementsByTagName("video")[0].pause();';
      
      webViewRef.current.injectJavaScript(playPauseCommand);
    }
  }, [isPlaying]);

  const handleVideoPress = () => {
    setShowControls(true);
    onPlayPause();
    
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  };

  return (
    <View style={[styles.videoContainer, dimensions]}>
      <WebView
        ref={webViewRef}
        source={{ uri: videoUrl }}
        style={styles.video}
        allowsFullscreenVideo={false}
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        javaScriptEnabled
        domStorageEnabled
      />
      
      <TouchableOpacity 
        style={styles.videoTouchable} 
        onPress={handleVideoPress}
        activeOpacity={1}
      >
        {showControls && (
          <View style={styles.controlsOverlay}>
            <TouchableOpacity 
              style={styles.playPauseButton}
              onPress={onPlayPause}
            >
              <Ionicons 
                name={isPlaying ? 'pause' : 'play'} 
                size={40} 
                color="white" 
              />
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: '#000',
    overflow: 'hidden',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
  videoTouchable: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  controlsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  playPauseButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
