import React from 'react';
import { Text, StyleSheet, Animated, Easing } from 'react-native';
import Colors from '@/constants/Colors';

type SubtitleProps = {
  text: string;
  isHighlighted?: boolean;
};

export const Subtitle: React.FC<SubtitleProps> = ({ text, isHighlighted = false }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isHighlighted ? 1 : 0.7,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [isHighlighted, fadeAnim]);

  return (
    <Animated.Text 
      style={[
        styles.subtitle,
        {
          opacity: fadeAnim,
          transform: [
            {
              scale: isHighlighted ? 1.05 : 1,
            },
          ],
          backgroundColor: isHighlighted ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
        },
      ]}
    >
      {text}
    </Animated.Text>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.light.text,
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
  },
});
