import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { VideoType } from '../types/video.types';
import { styles } from './VideoList.styles';

interface VideoListProps {
  videos: VideoType[];
  currentVideoId: string;
  onSelectVideo: (video: VideoType) => void;
}

export const VideoList = ({ videos, currentVideoId, onSelectVideo }: VideoListProps) => {
  const renderVideoItem = ({ item }: { item: VideoType }) => (
    <TouchableOpacity
      style={[
        styles.videoItem,
        item.id === currentVideoId && styles.selectedVideo
      ]}
      onPress={() => onSelectVideo(item)}
    >
      <Text style={styles.videoTitle} numberOfLines={2}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.videoList}>
      <Text style={styles.sectionTitle}>Available Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderVideoItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
