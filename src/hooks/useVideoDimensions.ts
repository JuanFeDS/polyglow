import { useWindowDimensions } from 'react-native';
import { VideoDimensions } from '../types/video.types';

export const useVideoDimensions = (): VideoDimensions => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const isDesktop = SCREEN_WIDTH > 768;
  
  return {
    isDesktop,
    height: isDesktop 
      ? Math.min(SCREEN_HEIGHT * 0.6, SCREEN_WIDTH * 0.4)
      : SCREEN_WIDTH * (9 / 16),
    width: isDesktop ? '70%' : '100%',
    maxWidth: 1000,
    marginHorizontal: isDesktop ? 'auto' : 0,
    borderRadius: isDesktop ? 12 : 0,
    boxShadow: isDesktop ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.2,
      shadowRadius: 25,
      elevation: 5
    } : {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0
    },
    marginTop: isDesktop ? 20 : 0,
  };
};
