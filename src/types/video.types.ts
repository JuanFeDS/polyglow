export interface SubtitleType {
  time: number; // in seconds
  text: string;
}

export interface VideoType {
  id: string;
  title: string;
  subtitles: SubtitleType[];
}

export interface VideoDimensions {
  isDesktop: boolean;
  height: number | string;
  width: string | number;
  maxWidth: number;
  marginHorizontal: number | string;
  borderRadius: number;
  boxShadow: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation?: number;
  };
  marginTop: number;
}
