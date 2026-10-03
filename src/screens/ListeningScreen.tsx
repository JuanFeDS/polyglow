import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';
import { VideoList } from '../components/VideoList';
import { ShadowingButton } from '../components/ShadowingButton';
import { useVideoDimensions } from '../hooks/useVideoDimensions';
import { VideoType } from '../types/video.types';
import Colors from '@/constants/Colors';

// Sample video data - in a real app, this would come from an API
const VIDEOS: VideoType[] = [
  {
    id: 'GV_Y5bDswLQ',
    title: 'TED Talk: The Power of Vulnerability',
    subtitles: [
      { time: 10, text: "So, I'll start with this: a couple years ago, an event planner called me because I was going to do a speaking event." },
      { time: 20, text: "And she called, and she said, 'I'm really struggling with how to write about you on the little flyer.'" },
    ]
  },
  {
    id: 'XEEDQox-SgI',
    title: 'TED Talk: The Puzzle of Motivation',
    subtitles: [
      { time: 10, text: "I need to make a confession at the outset here." },
      { time: 15, text: "A little over 20 years ago, I did something I regret." },
    ]
  }
];

export const ListeningScreen = () => {
  const navigation = useNavigation();
  const videoDims = useVideoDimensions();
  const styles = useMemo(() => getListeningScreenStyles(videoDims), [videoDims]);
  
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const currentVideo = VIDEOS[currentVideoIndex];
  
  const handleVideoSelect = useCallback((video: VideoType) => {
    const newIndex = VIDEOS.findIndex(v => v.id === video.id);
    if (newIndex !== -1) {
      setCurrentVideoIndex(newIndex);
      setIsPlaying(true);
    }
  }, []);
  
  const getYouTubeUrl = useCallback((videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&playsinline=1&controls=0&rel=0&showinfo=0&modestbranding=1&fs=1`;
  }, []);
  
  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);
  
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);
  
  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);
  
  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
  }, []);
  
  const currentSubtitle = useMemo(() => {
    if (!currentVideo?.subtitles?.length) return '';
    const subtitles = [...currentVideo.subtitles].reverse();
    return subtitles.find(sub => currentTime >= sub.time)?.text || '';
  }, [currentVideo, currentTime]);

  const handleShadowingPress = useCallback(() => {
    navigation.navigate('Shadowing', { videoId: currentVideo.id });
  }, [currentVideo.id, navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light.background,
      paddingBottom: 20,
    },
    header: {
      padding: 16,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.light.primary,
      textAlign: 'center',
    },
    subtitlesContainer: {
      padding: 16,
      margin: 16,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 8,
    },
    subtitleText: {
      fontSize: 16,
      color: Colors.light.text,
      textAlign: 'center',
    },
    shadowingButton: {
      margin: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {currentVideo.title}
        </Text>
      </View>

      <VideoPlayer
        videoUrl={getYouTubeUrl(currentVideo.id)}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
        onError={handleError}
        dimensions={videoDims}
      />

      {currentSubtitle ? (
        <View style={styles.subtitlesContainer}>
          <Text style={styles.subtitleText}>{currentSubtitle}</Text>
        </View>
      ) : null}

      <ShadowingButton 
        style={styles.shadowingButton}
        onPress={handleShadowingPress}
        isPlaying={isPlaying}
      />

      <VideoList 
        videos={VIDEOS}
        currentVideoId={currentVideo.id}
        onSelectVideo={handleVideoSelect}
      />
    </View>
  );
};
                </TouchableOpacity>
              </Animated.View>
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.subtitlesContainer}>
        {currentSubtitle && (
          <Subtitle
            text={currentSubtitle.text}
            isHighlighted={true}
          />
        )}
      </View>

      <View style={styles.controls}>
        <ShadowingButton 
          onPress={handleShadowingPress} 
          isActive={!isPlaying} 
        />
      </View>
      
      {/* Video selector */}
      <View style={styles.videoSelector}>
        {VIDEOS.map((video, index) => (
          <TouchableOpacity
            key={video.id}
            style={[
              styles.videoThumbnail,
              currentVideoIndex === index && styles.selectedVideo
            ]}
            onPress={() => {
              setCurrentVideoIndex(index);
              setCurrentSubtitle(null);
              setCurrentTime(0);
            }}
          >
            <Text style={styles.videoTitle} numberOfLines={1}>
              {video.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
