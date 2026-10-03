/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    // New colors for Listening module
    primary: '#3B82F6',
    secondary: '#FACC15',
    subtitleBackground: 'rgba(0, 0, 0, 0.7)',
    error: '#ff3b30',
    subtitleText: '#FFFFFF',
    shadow: 'rgba(0, 0, 0, 0.2)',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    // New colors for Listening module (dark mode)
    primary: '#60A5FA',
    secondary: '#FDE047',
    subtitleBackground: 'rgba(0, 0, 0, 0.8)',
    subtitleText: '#F3F4F6',
    shadow: '#000000',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export default Colors;
