import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export const styles = StyleSheet.create({
  videoList: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: Colors.light.text,
  },
  videoItem: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: Colors.light.background,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedVideo: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.primary,
    backgroundColor: `${Colors.light.primary}10`,
  },
  videoTitle: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
});
