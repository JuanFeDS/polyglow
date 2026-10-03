import { StyleSheet } from 'react-native';
import { VideoDimensions } from '../types/video.types';
import Colors from '@/constants/Colors';

export const getListeningScreenStyles = (videoDims: VideoDimensions) => {
  const { isDesktop } = videoDims;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.light.background,
      paddingBottom: 20,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
      backgroundColor: '#fff',
      width: isDesktop ? '70%' : '100%',
      marginHorizontal: isDesktop ? 'auto' : 0,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.light.primary,
      maxWidth: '70%',
      textAlign: 'center',
    },
    videoContainer: {
      width: videoDims.width,
      maxWidth: videoDims.maxWidth,
      height: videoDims.height,
      marginHorizontal: videoDims.marginHorizontal,
      backgroundColor: '#000',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: videoDims.borderRadius,
      ...videoDims.boxShadow,
      marginTop: videoDims.marginTop,
    },
    videoTouchable: {
      width: '100%',
      height: '100%',
    },
    video: {
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
    },
    loadingContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    errorContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      padding: 20,
    },
    errorText: {
      color: 'white',
      fontSize: 16,
      marginTop: 10,
      marginBottom: 20,
      textAlign: 'center',
    },
    retryButton: {
      backgroundColor: Colors.light.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    retryText: {
      color: 'white',
      fontWeight: 'bold',
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
    subtitlesContainer: {
      minHeight: 120,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      marginBottom: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: 8,
      marginHorizontal: isDesktop ? '15%' : 16,
    },
    videoList: {
      padding: 16,
      marginTop: 20,
    },
    videoItem: {
      padding: 12,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: '#e0e0e0',
      borderRadius: 8,
      backgroundColor: '#fff',
    },
    videoTitle: {
      fontSize: 14,
      color: Colors.light.text,
    },
    selectedVideo: {
      backgroundColor: `${Colors.light.primary}20`,
      borderColor: Colors.light.primary,
    },
  });
};
